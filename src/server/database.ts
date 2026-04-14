import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'srv1919.hstgr.io',
  user: process.env.DB_USER || 'u237012795_bhanucrm',
  password: process.env.DB_PASSWORD || 'S@bhanu7',
  database: process.env.DB_NAME || 'u237012795_bhanucrm',
  port: parseInt(process.env.DB_PORT || '3306'),
};

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function testConnection() {
  try {
    const connection = await getPool().getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
