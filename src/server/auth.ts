import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getPool } from './database';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-prod';

interface JwtPayload {
  userId: string;
  role: 'user' | 'manager' | 'admin';
}

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'user' | 'manager' | 'admin';
  };
}

export interface AuthMiddleware {
  (req: AuthRequest, res: Response, next: NextFunction): void;
}

export const auth: AuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const pool = getPool();
    const result = await pool.execute('SELECT id, role FROM users WHERE id = ?', [decoded.userId]) as [any[], any];
    const rows: any[] = result[0];
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    req.user = {
      id: rows[0].id,
      role: rows[0].role,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireRole = (requiredRole: 'user' | 'manager' | 'admin') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No user' });
    }
    const roleOrder = { user: 1, manager: 2, admin: 3 };
    if (roleOrder[req.user.role as keyof typeof roleOrder] >= roleOrder[requiredRole]) {
      next();
    } else {
      res.status(403).json({ error: 'Insufficient role' });
    }
  };
};

// Higher-order: authUser = auth + requireRole('user'), etc.
export const authUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  auth(req, res, () => requireRole('user')(req, res, next));
};
export const authManager = (req: AuthRequest, res: Response, next: NextFunction) => {
  auth(req, res, () => requireRole('manager')(req, res, next));
};
export const authAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  auth(req, res, () => requireRole('admin')(req, res, next));
};

export default auth;

