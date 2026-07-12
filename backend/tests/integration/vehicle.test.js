import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/lib/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../../src/lib/prisma.js', () => ({
  default: {
    vehicle: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const adminToken = jwt.sign({ userId: 'admin-1', role: 'Fleet Manager' }, JWT_SECRET);
const driverToken = jwt.sign({ userId: 'driver-1', role: 'Driver' }, JWT_SECRET);

describe('Vehicles Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authorization Checks', () => {
    it('should return 401 if token is missing', async () => {
      const res = await request(app).get('/api/vehicles');
      expect(res.status).toBe(401);
    });

    it('should return 403 if role is not Fleet Manager', async () => {
      const res = await request(app)
        .get('/api/vehicles')
        .set('Authorization', `Bearer ${driverToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/vehicles', () => {
    it('should return all vehicles', async () => {
      const mockVehicles = [
        { id: 'v1', registrationNumber: 'XYZ-123', name: 'Truck A', status: 'Available' },
        { id: 'v2', registrationNumber: 'ABC-789', name: 'Truck B', status: 'In Shop' }
      ];
      prisma.vehicle.findMany.mockResolvedValue(mockVehicles);

      const res = await request(app)
        .get('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockVehicles);
      expect(prisma.vehicle.findMany).toHaveBeenCalled();
    });
  });

  describe('GET /api/vehicles/:id', () => {
    it('should return a vehicle if found', async () => {
      const mockVehicle = { id: 'v1', registrationNumber: 'XYZ-123', name: 'Truck A', status: 'Available' };
      prisma.vehicle.findUnique.mockResolvedValue(mockVehicle);

      const res = await request(app)
        .get('/api/vehicles/v1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockVehicle);
    });

    it('should return 404 if vehicle not found', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .get('/api/vehicles/non-existent')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/vehicles', () => {
    const validVehicle = {
      registrationNumber: 'XYZ-123',
      name: 'Truck A',
      model: 'Volvo FH16',
      type: 'Heavy Truck',
      maxLoadCapacity: 25000,
      acquisitionCost: 150000
    };

    it('should create a vehicle successfully', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);
      prisma.vehicle.create.mockResolvedValue({ id: 'v1', ...validVehicle, status: 'Available' });

      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validVehicle);

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('v1');
      expect(res.body.registrationNumber).toBe('XYZ-123');
    });

    it('should return 400 if validation fails (missing fields)', async () => {
      const incompleteVehicle = { name: 'Truck A' };
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(incompleteVehicle);

      expect(res.status).toBe(400);
    });

    it('should return 400 if registration number is a duplicate', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v2', registrationNumber: 'XYZ-123' });

      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validVehicle);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('unique');
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    it('should update a vehicle successfully', async () => {
      const updateData = { name: 'Updated Truck A' };
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v1', registrationNumber: 'XYZ-123' });
      prisma.vehicle.update.mockResolvedValue({ id: 'v1', registrationNumber: 'XYZ-123', name: 'Updated Truck A', status: 'Available' });

      const res = await request(app)
        .put('/api/vehicles/v1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated Truck A');
    });

    it('should return 404 if vehicle to update is not found', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/vehicles/non-existent')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Updated Truck A' });

      expect(res.status).toBe(404);
    });

    it('should return 400 if updating registration number to a duplicate of another vehicle', async () => {
      prisma.vehicle.findUnique.mockImplementation(async ({ where }) => {
        if (where.id === 'v1') return { id: 'v1', registrationNumber: 'XYZ-123' };
        if (where.registrationNumber === 'DUP-999') return { id: 'v2', registrationNumber: 'DUP-999' };
        return null;
      });

      const res = await request(app)
        .put('/api/vehicles/v1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ registrationNumber: 'DUP-999' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('unique');
    });
  });

  describe('DELETE /api/vehicles/:id', () => {
    it('should delete a vehicle successfully', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v1' });
      prisma.vehicle.delete.mockResolvedValue({ id: 'v1' });

      const res = await request(app)
        .delete('/api/vehicles/v1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 404 if vehicle to delete is not found', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .delete('/api/vehicles/non-existent')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });
});
