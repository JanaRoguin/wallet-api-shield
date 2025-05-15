import { Router } from 'express';
import { getWallets, createWallet, updateWallet, deleteWallet } from '../controllers/wallet.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// All routes below require authentication
router.use(authenticate);

router.get('/', getWallets);
router.post('/', createWallet);
router.put('/:id', updateWallet);
router.delete('/:id', deleteWallet);

export default router;
