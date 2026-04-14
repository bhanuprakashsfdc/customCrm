import express, { Request, Response } from 'express';
import { initializeDatabase } from './init-db';
import { getPool } from './database';
import routes from './routes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './auth';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use('/api', routes);

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const pool = getPool();
    const result = await pool.execute('SELECT id, name, email, role, COALESCE(hashed_password, password) as hash FROM users WHERE email = ?', [email]) as [any[], any];
    const user = result[0] as { id: string; name: string; email: string; role: string; hashed_password?: string; password?: string };

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Use hashed_password if exists, fallback to password for legacy
    const hash = user[0].hash;
    if (!hash) return res.status(401).json({ error: 'No password hash' });
    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/migrate', async (req, res) => {
  try {
    const pool = getPool();
    const columns = [
      "ALTER TABLE contacts ADD COLUMN department VARCHAR(255)",
      "ALTER TABLE contacts ADD COLUMN contactRole VARCHAR(255)",
      "ALTER TABLE contacts ADD COLUMN isPrimary BOOLEAN",
      "ALTER TABLE contacts ADD COLUMN ownerId VARCHAR(255)",
      "ALTER TABLE users ADD COLUMN password VARCHAR(255)"
    ];
    for (const sql of columns) {
      try {
        await pool.execute(sql);
      } catch {}
    }
    res.json({ status: 'migrated' });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post('/api/reset', async (req, res) => {
  try {
    const pool = getPool();
    const tables = ['accounts', 'contacts', 'leads', 'opportunities', 'tasks', 'events', 'campaigns', 'quotes', 'orders', 'contracts', 'products', 'users'];
    for (const table of tables) {
      await pool.execute(`DELETE FROM ${table}`);
    }
    res.json({ status: 'reset', message: 'All records deleted' });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeDatabase().catch(console.error);