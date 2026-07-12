import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/lib/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../../src/lib/prisma.js', () => ({
  default: {
    trip: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    vehicle: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    driver: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const adminToken = jwt.sign({ userId: 'admin-1', role: 'Fleet Manager' }, JWT_SECRET);
const dispatcherToken = jwt.sign({ userId: 'dispatcher-1', role: 'Dispatcher' }, JWT_SECRET);
const driverToken = jwt.sign({ userId: 'driver-1', role: 'Driver' }, JWT_SECRET);

describe('Trips Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authorization Checks', () => {
    it('should return 401 if token is missing', async () => {
      const res = await request(app).get('/api/trips');
      expect(res.status).toBe(401);
    });

    it('should return 403 if role is not Fleet Manager or Dispatcher', async () => {
      const res = await request(app)
        .get('/api/trips')
        .set('Authorization', `Bearer ${driverToken}`);
      expect(res.status).toBe(403);
    });

    it('should allow Dispatcher role to access routes', async () => {
      prisma.trip.findMany.mockResolvedValue([]);
      const res = await request(app)
        .get('/api/trips')
        .set('Authorization', `Bearer ${dispatcherToken}`);
      expect(res.status).toBe(200);
    });
  });

  describe('POST /api/trips (Create Trip)', () => {
    const validTripData = {
      source: 'Warehouse A',
      destination: 'Retail Depot B',
      cargoWeight: 1500,
      plannedDistance: 120.5,
      vehicleId: 'v1',
      driverId: 'd1'
    };

    it('should create a trip in Draft status successfully', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v1' });
      prisma.driver.findUnique.mockResolvedValue({ id: 'd1' });
      prisma.trip.create.mockResolvedValue({ id: 't1', ...validTripData, status: 'Draft' });

      const res = await request(app)
        .post('/api/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validTripData);

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('t1');
      expect(res.body.status).toBe('Draft');
    });

    it('should return 400 if validation fails (missing fields)', async () => {
      const incompleteTrip = { source: 'Warehouse A' };
      const res = await request(app)
        .post('/api/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(incompleteTrip);

      expect(res.status).toBe(400);
    });

    it('should return 404 if assigned vehicle does not exist', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);
      prisma.driver.findUnique.mockResolvedValue({ id: 'd1' });

      const res = await request(app)
        .post('/api/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validTripData);

      expect(res.status).toBe(404);
      expect(prisma.trip.create).not.toHaveBeenCalled();
    });

    it('should return 404 if assigned driver does not exist', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v1' });
      prisma.driver.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validTripData);

      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/trips & GET /api/trips/:id', () => {
    it('should return all trips', async () => {
      const mockTrips = [
        { id: 't1', source: 'A', destination: 'B', status: 'Draft' }
      ];
      prisma.trip.findMany.mockResolvedValue(mockTrips);

      const res = await request(app)
        .get('/api/trips')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTrips);
    });

    it('should return a trip by ID', async () => {
      const mockTrip = { id: 't1', source: 'A', destination: 'B', status: 'Draft' };
      prisma.trip.findUnique.mockResolvedValue(mockTrip);

      const res = await request(app)
        .get('/api/trips/t1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTrip);
    });

    it('should return 404 if trip not found', async () => {
      prisma.trip.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .get('/api/trips/non-existent')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/trips/:id (Update Trip)', () => {
    it('should update a Draft trip successfully', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', status: 'Draft' });
      prisma.trip.update.mockResolvedValue({ id: 't1', source: 'Updated A', status: 'Draft' });

      const res = await request(app)
        .put('/api/trips/t1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ source: 'Updated A' });

      expect(res.status).toBe(200);
      expect(res.body.source).toBe('Updated A');
    });

    it('should return 400 if trying to update a non-Draft trip', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', status: 'Dispatched' });

      const res = await request(app)
        .put('/api/trips/t1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ source: 'Updated A' });

      expect(res.status).toBe(400);
      expect(prisma.trip.update).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /api/trips/:id', () => {
    it('should delete a Draft trip successfully', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', status: 'Draft' });
      prisma.trip.delete.mockResolvedValue({ id: 't1' });

      const res = await request(app)
        .delete('/api/trips/t1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 400 if trying to delete a non-Draft trip', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', status: 'Completed' });

      const res = await request(app)
        .delete('/api/trips/t1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(prisma.trip.delete).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/trips/:id/dispatch (Dispatch Validations)', () => {
    const defaultTrip = { id: 't1', cargoWeight: 2000, vehicleId: 'v1', driverId: 'd1', status: 'Draft' };
    const defaultVehicle = { id: 'v1', maxLoadCapacity: 5000, status: 'Available' };
    const defaultDriver = { id: 'd1', status: 'Available' };

    beforeEach(() => {
      prisma.trip.findUnique.mockResolvedValue(defaultTrip);
      prisma.vehicle.findUnique.mockResolvedValue(defaultVehicle);
      prisma.driver.findUnique.mockResolvedValue(defaultDriver);
    });

    it('should dispatch successfully and update assets to On Trip', async () => {
      prisma.trip.update.mockResolvedValue({ ...defaultTrip, status: 'Dispatched' });
      prisma.vehicle.update.mockResolvedValue({ ...defaultVehicle, status: 'On Trip' });
      prisma.driver.update.mockResolvedValue({ ...defaultDriver, status: 'On Trip' });

      const res = await request(app)
        .post('/api/trips/t1/dispatch')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Dispatched');

      expect(prisma.vehicle.update).toHaveBeenCalledWith({
        where: { id: 'v1' },
        data: { status: 'On Trip' }
      });
      expect(prisma.driver.update).toHaveBeenCalledWith({
        where: { id: 'd1' },
        data: { status: 'On Trip' }
      });
    });

    it('should fail dispatch if cargo weight exceeds vehicle capacity', async () => {
      prisma.trip.findUnique.mockResolvedValue({ ...defaultTrip, cargoWeight: 8000 });

      const res = await request(app)
        .post('/api/trips/t1/dispatch')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('capacity');
    });

    it('should fail dispatch if driver license is suspended', async () => {
      prisma.driver.findUnique.mockResolvedValue({ ...defaultDriver, status: 'Suspended' });

      const res = await request(app)
        .post('/api/trips/t1/dispatch')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('suspended');
    });

    it('should fail dispatch if vehicle is in shop', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ ...defaultVehicle, status: 'In Shop' });

      const res = await request(app)
        .post('/api/trips/t1/dispatch')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('maintenance');
    });

    it('should fail dispatch if vehicle is already on a trip', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ ...defaultVehicle, status: 'On Trip' });

      const res = await request(app)
        .post('/api/trips/t1/dispatch')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('active trip');
    });

    it('should fail dispatch if driver is already on a trip', async () => {
      prisma.driver.findUnique.mockResolvedValue({ ...defaultDriver, status: 'On Trip' });

      const res = await request(app)
        .post('/api/trips/t1/dispatch')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('active trip');
    });

    it('should fail dispatch if driver is off duty', async () => {
      prisma.driver.findUnique.mockResolvedValue({ ...defaultDriver, status: 'Off Duty' });

      const res = await request(app)
        .post('/api/trips/t1/dispatch')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('off duty');
    });

    it('should fail dispatch if vehicle is retired', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ ...defaultVehicle, status: 'Retired' });

      const res = await request(app)
        .post('/api/trips/t1/dispatch')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('retired');
    });
  });

  describe('POST /api/trips/:id/complete', () => {
    it('should complete a Dispatched trip and set assets back to Available', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', vehicleId: 'v1', driverId: 'd1', status: 'Dispatched' });
      prisma.trip.update.mockResolvedValue({ id: 't1', status: 'Completed' });

      const res = await request(app)
        .post('/api/trips/t1/complete')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Completed');

      expect(prisma.vehicle.update).toHaveBeenCalledWith({
        where: { id: 'v1' },
        data: { status: 'Available' }
      });
      expect(prisma.driver.update).toHaveBeenCalledWith({
        where: { id: 'd1' },
        data: { status: 'Available' }
      });
    });

    it('should return 400 if trying to complete a non-Dispatched trip', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', status: 'Draft' });

      const res = await request(app)
        .post('/api/trips/t1/complete')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(prisma.trip.update).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/trips/:id/cancel', () => {
    it('should cancel a Draft trip and leave assets unchanged', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', vehicleId: 'v1', driverId: 'd1', status: 'Draft' });
      prisma.trip.update.mockResolvedValue({ id: 't1', status: 'Cancelled' });

      const res = await request(app)
        .post('/api/trips/t1/cancel')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Cancelled');
      expect(prisma.vehicle.update).not.toHaveBeenCalled();
      expect(prisma.driver.update).not.toHaveBeenCalled();
    });

    it('should cancel a Dispatched trip and set assets back to Available', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', vehicleId: 'v1', driverId: 'd1', status: 'Dispatched' });
      prisma.trip.update.mockResolvedValue({ id: 't1', status: 'Cancelled' });

      const res = await request(app)
        .post('/api/trips/t1/cancel')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Cancelled');

      expect(prisma.vehicle.update).toHaveBeenCalledWith({
        where: { id: 'v1' },
        data: { status: 'Available' }
      });
      expect(prisma.driver.update).toHaveBeenCalledWith({
        where: { id: 'd1' },
        data: { status: 'Available' }
      });
    });

    it('should return 400 if trying to cancel an already Completed or Cancelled trip', async () => {
      prisma.trip.findUnique.mockResolvedValue({ id: 't1', status: 'Completed' });

      const res = await request(app)
        .post('/api/trips/t1/cancel')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
    });
  });
});
