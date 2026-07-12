import { Router } from 'express';
import * as fuelController from '../controllers/fuel.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(verifyToken, requireRole(['Fleet Manager', 'Financial Analyst']));

router.get('/', fuelController.getAllFuelLogs);
router.get('/:id', fuelController.getFuelLogById);
router.post('/', fuelController.createFuelLog);
router.put('/:id', fuelController.updateFuelLog);
router.delete('/:id', fuelController.deleteFuelLog);

export default router;
