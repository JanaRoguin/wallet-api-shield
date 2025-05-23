import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getWallets = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const wallets = await prisma.wallet.findMany({ where: { userId } });
  res.json(wallets);
};

export const createWallet = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { name, balance, tag, chain, address } = req.body;

  if (!chain || !address) {
    return res.status(400).json({ error: 'chain and address are required' });
  }

  try {
    const wallet = await prisma.wallet.create({
      data: {
        name,
        balance: balance ?? 0,
        tag,
        chain,
        address,
        userId,
      },
    });

    res.status(201).json(wallet);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Address must be unique' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateWallet = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const walletId = parseInt(req.params.id);
  const { name, balance, tag, chain, address } = req.body;

  try {
    const wallet = await prisma.wallet.updateMany({
      where: { id: walletId, userId },
      data: { name, balance, tag, chain, address },
    });

    if (wallet.count === 0) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.status(200).json({ message: 'Wallet updated successfully' });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Address must be unique' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteWallet = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const walletId = parseInt(req.params.id);

  const wallet = await prisma.wallet.deleteMany({
    where: { id: walletId, userId },
  });

  if (wallet.count === 0) {
    return res.status(404).json({ error: 'Wallet not found' });
  }

  res.status(200).json({ message: 'Wallet deleted successfully' });
};

