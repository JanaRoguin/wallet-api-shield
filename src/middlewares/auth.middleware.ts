import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = payload; 
    next();
  } catch (e) {
    res.sendStatus(403);
  }
}
