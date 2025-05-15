import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { signInSchema } from '../models/user.schema';
import { comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export const signin = async (req: Request, res: Response) => {
  const parsed = signInSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePasswords(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken({ userId: user.id });

  return res.status(200).json({ token });
};

