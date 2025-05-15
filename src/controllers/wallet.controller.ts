import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getWallets = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const wallets = await prisma.wallet.findMany({ where: { userId } });
  res.json(wallets);
};

export const createWallet = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { name, balance } = req.body;

  const wallet = await prisma.wallet.create({
    data: {
      name,
      balance: balance ?? 0,
      userId,
    },
  });

  res.status(201).json(wallet);
};

export const updateWallet = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const walletId = parseInt(req.params.id);
  const { name, balance } = req.body;

  const wallet = await prisma.wallet.updateMany({
    where: { id: walletId, userId },
    data: { name, balance },
  });

  if (wallet.count === 0) return res.sendStatus(404);
  res.sendStatus(204);
};

export const deleteWallet = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const walletId = parseInt(req.params.id);

  const wallet = await prisma.wallet.deleteMany({
    where: { id: walletId, userId },
  });

  if (wallet.count === 0) return res.sendStatus(404);
  res.sendStatus(204);
};
