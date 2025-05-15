import { Router } from 'express';
import { signin, signout } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signin', signin);
router.post('/signout', authenticate, signout);

export default router;
