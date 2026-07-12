import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(verifyToken, requireRole(['Fleet Manager', 'Financial Analyst', 'Dispatcher', 'Safety Officer']));

router.get('/', dashboardController.getDashboardStats);

export default router;
