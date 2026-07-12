import { Router } from 'express';
import * as vehicleController from '../controllers/vehicle.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply auth middleware to all endpoints
router.use(verifyToken);

router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.post('/', requireRole(['Fleet Manager']), vehicleController.createVehicle);
router.put('/:id', requireRole(['Fleet Manager', 'Dispatcher', 'Financial Analyst']), vehicleController.updateVehicle); // Others need to update status
router.delete('/:id', requireRole(['Fleet Manager']), vehicleController.deleteVehicle);

export default router;
