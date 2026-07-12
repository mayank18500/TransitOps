import { Router } from 'express';
import { login, getMe } from '../controllers/auth.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', verifyToken, getMe);

export default router;
