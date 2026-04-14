import { getPool } from './database';

export async function initializeDatabase() {
  const pool = getPool();
  
  const tables = [
    `CREATE TABLE IF NOT EXISTS accounts (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(255),
      industry VARCHAR(255),
      website VARCHAR(255),
      billingAddress TEXT,
      shippingAddress TEXT,
      createdAt DATETIME,
      updatedAt DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS contacts (
      id VARCHAR(255) PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(255),
      accountId VARCHAR(255),
      position VARCHAR(255),
      department VARCHAR(255),
      contactRole VARCHAR(255),
      isPrimary BOOLEAN,
      ownerId VARCHAR(255),
      createdAt DATETIME,
      updatedAt DATETIME,
      FOREIGN KEY (accountId) REFERENCES accounts(id)
    )`,
    `CREATE TABLE IF NOT EXISTS leads (
      id VARCHAR(255) PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(255),
      company VARCHAR(255),
      status VARCHAR(255),
      source VARCHAR(255),
      accountId VARCHAR(255),
      createdAt DATETIME,
      updatedAt DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS opportunities (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      value DECIMAL(15,2),
      stage VARCHAR(255),
      probability INT,
      closeDate DATE,
      accountId VARCHAR(255),
      contactId VARCHAR(255),
      createdAt DATETIME,
      updatedAt DATETIME,
      FOREIGN KEY (accountId) REFERENCES accounts(id),
      FOREIGN KEY (contactId) REFERENCES contacts(id)
    )`,
    `CREATE TABLE IF NOT EXISTS tasks (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      status VARCHAR(255),
      priority VARCHAR(255),
      dueDate DATE,
      relatedToType VARCHAR(255),
      relatedToId VARCHAR(255),
      assignedTo VARCHAR(255),
      createdAt DATETIME,
      updatedAt DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS events (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      startDate DATETIME,
      endDate DATETIME,
      location VARCHAR(255),
      relatedToType VARCHAR(255),
      relatedToId VARCHAR(255),
      createdAt DATETIME,
      updatedAt DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS campaigns (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      type VARCHAR(255),
      status VARCHAR(255),
      startDate DATE,
      endDate DATE,
      budget DECIMAL(15,2),
      createdAt DATETIME,
      updatedAt DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS quotes (
      id VARCHAR(255) PRIMARY KEY,
      quoteNumber VARCHAR(255),
      accountId VARCHAR(255),
      opportunityId VARCHAR(255),
      total DECIMAL(15,2),
      status VARCHAR(255),
      validUntil DATE,
      createdAt DATETIME,
      updatedAt DATETIME,
      FOREIGN KEY (accountId) REFERENCES accounts(id),
      FOREIGN KEY (opportunityId) REFERENCES opportunities(id)
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(255) PRIMARY KEY,
      orderNumber VARCHAR(255),
      accountId VARCHAR(255),
      quoteId VARCHAR(255),
      total DECIMAL(15,2),
      status VARCHAR(255),
      orderDate DATE,
      createdAt DATETIME,
      updatedAt DATETIME,
      FOREIGN KEY (accountId) REFERENCES accounts(id),
      FOREIGN KEY (quoteId) REFERENCES quotes(id)
    )`,
    `CREATE TABLE IF NOT EXISTS contracts (
      id VARCHAR(255) PRIMARY KEY,
      contractNumber VARCHAR(255),
      accountId VARCHAR(255),
      value DECIMAL(15,2),
      startDate DATE,
      endDate DATE,
      status VARCHAR(255),
      createdAt DATETIME,
      updatedAt DATETIME,
      FOREIGN KEY (accountId) REFERENCES accounts(id)
    )`,
    `CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      sku VARCHAR(255),
      description TEXT,
      price DECIMAL(15,2),
      quantity INT,
      createdAt DATETIME,
      updatedAt DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      role VARCHAR(255),
      createdAt DATETIME,
      updatedAt DATETIME
    )`,
  ];

  for (const sql of tables) {
    await pool.execute(sql);
  }
  
  console.log('Database tables initialized');
}
