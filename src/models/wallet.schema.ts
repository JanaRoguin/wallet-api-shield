import { z } from 'zod';

export const createWalletSchema = z.object({
  name: z.string().min(1),
  tag: z.string().optional(),
  chain: z.string().min(1),
  address: z.string().min(1),
  balance: z.number().optional().default(0),
});

export const updateWalletSchema = z.object({
  name: z.string().min(1).optional(),
  tag: z.string().optional(),
  chain: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  balance: z.number().optional(),
});
