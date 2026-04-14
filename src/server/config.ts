import { getPool } from './database';
import mysql from 'mysql2/promise';

interface Config {
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  defaultRole: 'user';
  showAllCurrencies: boolean;
  region: 'US' | 'UK' | 'IND';
}

const defaultConfig: Config = {
  currency: 'USD',
  defaultRole: 'user',
  showAllCurrencies: true,
  region: 'US'
};

export async function getConfig(userId: string): Promise<Config> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT * FROM config WHERE userId = ?', [userId]) as any;
    if (rows.length > 0) {
      return rows[0] as Config;
    }
    // Create default config if not exists
    await pool.execute('INSERT INTO config (userId, currency, defaultRole, region) VALUES (?, ?, ?, ?)', [userId, 'USD', 'user', 'US']);
    return defaultConfig;
  } catch {
    return defaultConfig;
  }
}

export async function updateConfig(userId: string, updates: Partial<Config>): Promise<Config> {
  try {
    const pool = getPool();
    const config = await getConfig(userId);
    const newConfig = { ...config, ...updates };
    
    const [result] = await pool.execute(
      'UPDATE config SET currency = ?, defaultRole = ?, showAllCurrencies = ?, region = ?, updatedAt = ? WHERE userId = ?',
      [newConfig.currency, newConfig.defaultRole, newConfig.showAllCurrencies ? 1 : 0, newConfig.region, new Date(), userId]
    ) as [mysql.OkPacket, any];
    
    const affectedRows = (result as mysql.OkPacket).affectedRows || 0;
    if (affectedRows === 0) {
      await pool.execute(
        'INSERT INTO config (userId, currency, defaultRole, showAllCurrencies, region, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, newConfig.currency, newConfig.defaultRole, newConfig.showAllCurrencies ? 1 : 0, newConfig.region, new Date()]
      );
    }
    return newConfig as Config;
  } catch (error) {
    console.error('Config update error:', error);
    throw error;
  }
}

