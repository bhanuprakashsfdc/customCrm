import { Router, Request, Response } from 'express';
import { getPool } from './database';
import { authUser, authAdmin } from './auth';
import bcrypt from 'bcryptjs';
import { updateConfig } from './config';

const router = Router();

const objectTypes = [
  'accounts', 'contacts', 'leads', 'opportunities', 
  'tasks', 'events', 'campaigns', 'quotes', 'orders', 
  'contracts', 'products', 'users'
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

router.put('/config', authAdmin, async (req: Request, res: Response) => {
  try {
    const { updateConfig } = await import('./config');
    const config = await updateConfig(req.body);
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Config update failed' });
  }
});

export default router;
