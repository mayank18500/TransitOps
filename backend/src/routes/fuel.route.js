import { Router } from 'express';
import * as fuelController from '../controllers/fuel.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/', fuelController.getAllFuelLogs);
router.get('/:id', fuelController.getFuelLogById);
router.post('/', requireRole(['Financial Analyst', 'Fleet Manager']), fuelController.createFuelLog);
router.put('/:id', requireRole(['Financial Analyst', 'Fleet Manager']), fuelController.updateFuelLog);
router.delete('/:id', requireRole(['Financial Analyst', 'Fleet Manager']), fuelController.deleteFuelLog);

export default router;
