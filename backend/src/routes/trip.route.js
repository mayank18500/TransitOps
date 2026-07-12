import { Router } from 'express';
import * as tripController from '../controllers/trip.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Apply auth check
router.use(verifyToken);

router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getTripById);

const dispatchRoles = requireRole(['Dispatcher', 'Fleet Manager']);
router.post('/', dispatchRoles, tripController.createTrip);
router.put('/:id', dispatchRoles, tripController.updateTrip);
router.delete('/:id', dispatchRoles, tripController.deleteTrip);

router.post('/:id/dispatch', dispatchRoles, tripController.dispatchTrip);
router.post('/:id/complete', dispatchRoles, tripController.completeTrip);
router.post('/:id/cancel', dispatchRoles, tripController.cancelTrip);

export default router;
