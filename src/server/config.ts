import { getPool } from './database';

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

export async function getConfig(): Promise<Config> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT * FROM config LIMIT 1') as any;
    if (rows.length > 0) {
      return rows[0] as Config;
    }
    // Create default config if not exists
    await pool.execute('INSERT INTO config (currency, defaultRole, region) VALUES (?, ?, ?)', ['USD', 'user', 'US']);
    return defaultConfig;
  } catch {
    return defaultConfig;
  }
}

export async function updateConfig(updates: Partial<Config>): Promise<Config> {
  try {
    const pool = getPool();
    const config = await getConfig();
    
    // Handle empty updates - just return current config
    if (!updates || Object.keys(updates).length === 0) {
      return config;
    }
    
    // Handle nested localization from frontend
    let cleanUpdates = updates;
    if ('localization' in updates && updates.localization) {
      const loc = updates.localization as any;
      cleanUpdates = {
        currency: loc.currency || config.currency,
        defaultRole: loc.defaultRole || config.defaultRole,
        showAllCurrencies: loc.showAllCurrencies ?? config.showAllCurrencies,
        region: loc.region || config.region
      };
    }
    
    const newConfig = { ...config, ...cleanUpdates };
    
    await pool.execute(
      'UPDATE config SET currency = ?, defaultRole = ?, showAllCurrencies = ?, region = ?, updatedAt = ?',
      [newConfig.currency, newConfig.defaultRole, newConfig.showAllCurrencies ? 1 : 0, newConfig.region, new Date()]
    );
    return newConfig;
  } catch (error) {
    console.error('Config update error:', error);
    throw error;
  }
}