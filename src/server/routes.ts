import { Router, Request, Response } from 'express';
import { getPool } from './database';
import { authUser, authAdmin } from './auth';
import bcrypt from 'bcryptjs';
import { updateConfig } from './config';

const router = Router();

const objectTypes = [
  'accounts', 'contacts', 'leads', 'opportunities', 
  'tasks', 'events', 'campaigns', 'quotes', 'orders', 
  'contracts', 'products', 'users', 'cases'
];

for (const type of objectTypes) {
  router.get(`/${type}`, authUser, async (req: Request, res: Response) => {
    try {
      const pool = getPool();
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = (page - 1) * limit;
      const [rows]: any = await pool.query(`SELECT * FROM ${type} LIMIT ? OFFSET ?`, [limit, offset]);
      console.log(`Fetched ${type}:`, rows);
      res.json({ data: rows, page, limit, offset });
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      res.status(500).json({ error: `Failed to fetch ${type}` });
    }
  });

  router.get(`/${type}/:id`, authUser, async (req: Request, res: Response) => {
    try {
      const pool = getPool();
      const [rows]: any = await pool.execute(
        `SELECT * FROM ${type} WHERE id = ?`,
        [req.params.id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error(`Error fetching ${type} by id:`, error);
      res.status(500).json({ error: `Failed to fetch ${type}` });
    }
  });

router.post(`/${type}`, authUser, async (req: Request, res: Response) => {
    try {
      const pool = getPool();
      const record = req.body;
      console.log(`Creating ${type}:`, record);
      if (type === 'users') {
        record.role = record.role || 'user';
        if (record.password) {
          record.hashed_password = await bcrypt.hash(record.password, 10);
        }
        delete record.password;
      }
      record.id = record.id || `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      record.createdAt = record.createdAt || new Date();
      record.updatedAt = new Date();
      
      const fields = Object.keys(record);
      const values = Object.values(record);
      const placeholders = fields.map(() => '?').join(', ');
      
      await pool.query(
        `INSERT INTO ${type} (${fields.join(', ')}) VALUES (${placeholders})`,
        values as any
      );
      res.status(201).json(record);
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
      res.status(500).json({ error: `Failed to create ${type}` });
    }
  });

  router.put(`/${type}/:id`, authUser, async (req: Request, res: Response) => {
    try {
      const pool = getPool();
      const record = req.body;
      record.updatedAt = new Date();
      
      const fields = Object.keys(record);
      const values = Object.values(record);
      
      const setClause = fields.map(f => `${f} = ?`).join(', ');
      
      await pool.query(
        `UPDATE ${type} SET ${setClause} WHERE id = ?`,
        [...values, req.params.id] as any
      );
      res.json(record);
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      res.status(500).json({ error: `Failed to update ${type}` });
    }
  });

  router.delete(`/${type}/:id`, authUser, async (req: Request, res: Response) => {
    try {
      const pool = getPool();
      await pool.execute(`DELETE FROM ${type} WHERE id = ?`, [req.params.id]);
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      res.status(500).json({ error: `Failed to delete ${type}` });
    }
  });
}

// Search endpoints for accounts and contacts (auto-suggest/lookup)
router.get('/accounts/search', authUser, async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const q = (req.query.q as string) || '';
    const limit = parseInt(req.query.limit as string) || 10;
    let sql = 'SELECT id, name, email, phone FROM accounts';
    let params: any[] = [];
    if (q) {
      sql += ' WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?';
      const searchTerm = `%${q}%`;
      params = [searchTerm, searchTerm, searchTerm];
    }
    sql += ' LIMIT ?';
    params.push(limit);
    const [rows]: any = await pool.query(sql, params);
    res.json({ data: rows });
  } catch (error) {
    console.error('Error searching accounts:', error);
    res.status(500).json({ error: 'Failed to search accounts' });
  }
});

router.get('/accounts/lookup/:id', authUser, async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [rows]: any = await pool.execute('SELECT id, name, email, phone, industry, website FROM accounts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error looking up account:', error);
    res.status(500).json({ error: 'Failed to lookup account' });
  }
});

router.get('/contacts/search', authUser, async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const q = (req.query.q as string) || '';
    const accountId = req.query.accountId as string;
    const limit = parseInt(req.query.limit as string) || 10;
    let sql = 'SELECT id, firstName, lastName, email, phone, accountId, position FROM contacts';
    const params: any[] = [];
    if (q || accountId) {
      const conditions: string[] = [];
      if (q) {
        conditions.push('(firstName LIKE ? OR lastName LIKE ? OR email LIKE ? OR phone LIKE ?)');
        const searchTerm = `%${q}%`;
        params.push(searchTerm, searchTerm, searchTerm, searchTerm);
      }
      if (accountId) {
        conditions.push('accountId = ?');
        params.push(accountId);
      }
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' LIMIT ?';
    params.push(limit);
    const [rows]: any = await pool.query(sql, params);
    res.json({ data: rows });
  } catch (error) {
    console.error('Error searching contacts:', error);
    res.status(500).json({ error: 'Failed to search contacts' });
  }
});

router.get('/contacts/lookup/:id', authUser, async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [rows]: any = await pool.execute(
      'SELECT c.*, a.name as accountName FROM contacts c LEFT JOIN accounts a ON c.accountId = a.id WHERE c.id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error looking up contact:', error);
    res.status(500).json({ error: 'Failed to lookup contact' });
  }
});

// Search endpoints for other objects by accountId/contactId
const linkedObjects = ['tasks', 'events', 'campaigns', 'cases', 'quotes', 'orders', 'contracts'];
for (const type of linkedObjects) {
  router.get(`/${type}/by-account/:accountId`, authUser, async (req: Request, res: Response) => {
    try {
      const pool = getPool();
      const limit = parseInt(req.query.limit as string) || 100;
      const [rows]: any = await pool.query(
        `SELECT * FROM ${type} WHERE accountId = ? LIMIT ?`,
        [req.params.accountId, limit]
      );
      res.json({ data: rows });
    } catch (error) {
      console.error(`Error fetching ${type} by account:`, error);
      res.status(500).json({ error: `Failed to fetch ${type}` });
    }
  });

  router.get(`/${type}/by-contact/:contactId`, authUser, async (req: Request, res: Response) => {
    try {
      const pool = getPool();
      const limit = parseInt(req.query.limit as string) || 100;
      const [rows]: any = await pool.query(
        `SELECT * FROM ${type} WHERE contactId = ? LIMIT ?`,
        [req.params.contactId, limit]
      );
      res.json({ data: rows });
    } catch (error) {
      console.error(`Error fetching ${type} by contact:`, error);
      res.status(500).json({ error: `Failed to fetch ${type}` });
    }
  });

  router.get(`/${type}/search`, authUser, async (req: Request, res: Response) => {
    try {
      const pool = getPool();
      const accountId = req.query.accountId as string;
      const contactId = req.query.contactId as string;
      const limit = parseInt(req.query.limit as string) || 100;
      let sql = `SELECT * FROM ${type}`;
      const params: any[] = [];
      const conditions: string[] = [];
      if (accountId) {
        conditions.push('accountId = ?');
        params.push(accountId);
      }
      if (contactId) {
        conditions.push('contactId = ?');
        params.push(contactId);
      }
      if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
      }
      sql += ' LIMIT ?';
      params.push(limit);
      const [rows]: any = await pool.query(sql, params);
      res.json({ data: rows });
    } catch (error) {
      console.error(`Error searching ${type}:`, error);
      res.status(500).json({ error: `Failed to search ${type}` });
    }
  });
}

// Config routes
router.get('/config', authUser, async (req: Request, res: Response) => {
  try {
    const { getConfig } = await import('./config');
    const config = await getConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Config error' });
  }
});

router.put('/config', authUser, async (req: Request, res: Response) => {
  try {
    const { updateConfig } = await import('./config');
    const config = await updateConfig(req.body);
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Config update failed' });
  }
});

export default router;
