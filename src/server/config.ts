import { getPool } from './database';

interface Config {
  currency: 'INR' | 'USD' | 'EUR';
  defaultRole: 'user';
}

const defaultConfig: Config = {
  currency: 'INR',
  defaultRole: 'user'
};

export async function getConfig() {
  try {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT * FROM config LIMIT 1') as any;
    if (rows.length > 0) {
      return rows[0] as Config;
    }
  } catch {}
  return defaultConfig;
}

export async function updateConfig(updates: Partial<Config>) {
  const pool = getPool();
  const config = await getConfig();
  const newConfig = { ...config, ...updates };
  
  try {
    await pool.execute(
      'INSERT INTO config (currency, defaultRole) VALUES (?, ?) ON DUPLICATE KEY UPDATE currency = ?, defaultRole = ?',
      [newConfig.currency, newConfig.defaultRole, newConfig.currency, newConfig.defaultRole]
    );
    return newConfig;
  } catch (error) {
    console.error('Config update error:', error);
    throw error;
  }
}

