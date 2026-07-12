import { Router } from 'express';
import * as driverController from '../controllers/driver.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply auth middleware to all endpoints
router.use(verifyToken);

router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);
router.post('/', requireRole(['Fleet Manager']), driverController.createDriver);
router.put('/:id', requireRole(['Fleet Manager', 'Dispatcher', 'Safety Officer']), driverController.updateDriver);
router.delete('/:id', requireRole(['Fleet Manager']), driverController.deleteDriver);

export default router;
