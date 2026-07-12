import { Router } from 'express';
import * as tripController from '../controllers/trip.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply auth check and allow both Fleet Manager and Dispatcher
router.use(verifyToken, requireRole(['Fleet Manager', 'Dispatcher']));

router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getTripById);
router.post('/', tripController.createTrip);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

router.post('/:id/dispatch', tripController.dispatchTrip);
router.post('/:id/complete', tripController.completeTrip);
router.post('/:id/cancel', tripController.cancelTrip);

export default router;
