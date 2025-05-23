import { Router } from 'express';
import { getWallets, createWallet, updateWallet, deleteWallet } from '../controllers/wallet.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware'; 
import { createWalletSchema, updateWalletSchema } from '../models/wallet.schema';

const router = Router();

router.use(authenticate);

router.get('/', getWallets);
router.post('/', validateBody(createWalletSchema), createWallet);
router.put('/:id', validateBody(updateWalletSchema), updateWallet);
router.delete('/:id', deleteWallet);

export default router;