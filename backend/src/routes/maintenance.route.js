import { Router } from 'express';
import * as maintenanceController from '../controllers/maintenance.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply auth middleware to all endpoints
router.use(verifyToken);

router.get('/', maintenanceController.getAllMaintenance);
router.post('/', requireRole(['Financial Analyst', 'Fleet Manager']), maintenanceController.createMaintenance);

export default router;
