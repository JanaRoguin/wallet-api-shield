import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateBody =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.format() });
    }

    req.body = result.data;
    next();
  };

