import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/lib/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../../src/lib/prisma.js', () => ({
  default: {
    maintenance: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    vehicle: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const adminToken = jwt.sign({ userId: 'admin-1', role: 'Fleet Manager' }, JWT_SECRET);
const driverToken = jwt.sign({ userId: 'driver-1', role: 'Driver' }, JWT_SECRET);

describe('Maintenance Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authorization Checks', () => {
    it('should return 401 if token is missing', async () => {
      const res = await request(app).post('/api/maintenance');
      expect(res.status).toBe(401);
    });

    it('should return 403 if role is not Fleet Manager', async () => {
      const res = await request(app)
        .post('/api/maintenance')
        .set('Authorization', `Bearer ${driverToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe('POST /api/maintenance', () => {
    const validMaintenance = {
      description: 'Engine repair',
      cost: 500.0,
      vehicleId: 'v1',
      status: 'Open'
    };

    it('should create maintenance record and change Vehicle status to In Shop', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v1', status: 'Available' });
      prisma.maintenance.create.mockResolvedValue({ id: 'm1', ...validMaintenance });
      prisma.vehicle.update.mockResolvedValue({ id: 'v1', status: 'In Shop' });

      const res = await request(app)
        .post('/api/maintenance')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validMaintenance);

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('m1');
      expect(res.body.vehicleId).toBe('v1');

      expect(prisma.vehicle.update).toHaveBeenCalledWith({
        where: { id: 'v1' },
        data: { status: 'In Shop' }
      });
    });

    it('should return 404 if vehicle does not exist', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/maintenance')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validMaintenance);

      expect(res.status).toBe(404);
      expect(prisma.maintenance.create).not.toHaveBeenCalled();
    });

    it('should return 400 if validation fails (missing fields)', async () => {
      const incomplete = { description: 'Only desc' };
      const res = await request(app)
        .post('/api/maintenance')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(incomplete);

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/maintenance', () => {
    it('should return all maintenance records', async () => {
      const mockRecords = [
        { id: 'm1', description: 'Tire change', cost: 120, vehicleId: 'v1', status: 'Closed' }
      ];
      prisma.maintenance.findMany.mockResolvedValue(mockRecords);

      const res = await request(app)
        .get('/api/maintenance')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockRecords);
    });
  });
});
