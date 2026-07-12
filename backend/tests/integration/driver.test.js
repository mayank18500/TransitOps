import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/lib/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../../src/lib/prisma.js', () => ({
  default: {
    driver: {
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

describe('Drivers Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authorization Checks', () => {
    it('should return 401 if token is missing', async () => {
      const res = await request(app).get('/api/drivers');
      expect(res.status).toBe(401);
    });

    it('should return 403 if role is not Fleet Manager', async () => {
      const res = await request(app)
        .get('/api/drivers')
        .set('Authorization', `Bearer ${driverToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/drivers', () => {
    it('should return all drivers', async () => {
      const mockDrivers = [
        { id: 'd1', name: 'John Doe', licenseNumber: 'DL123', licenseCategory: 'Class A', status: 'Available' },
        { id: 'd2', name: 'Jane Smith', licenseNumber: 'DL456', licenseCategory: 'Class B', status: 'On Trip' }
      ];
      prisma.driver.findMany.mockResolvedValue(mockDrivers);

      const res = await request(app)
        .get('/api/drivers')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockDrivers);
      expect(prisma.driver.findMany).toHaveBeenCalled();
    });
  });

  describe('GET /api/drivers/:id', () => {
    it('should return a driver if found', async () => {
      const mockDriver = { id: 'd1', name: 'John Doe', licenseNumber: 'DL123', status: 'Available' };
      prisma.driver.findUnique.mockResolvedValue(mockDriver);

      const res = await request(app)
        .get('/api/drivers/d1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockDriver);
    });

    it('should return 404 if driver not found', async () => {
      prisma.driver.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .get('/api/drivers/non-existent')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/drivers', () => {
    const validDriver = {
      name: 'John Doe',
      licenseNumber: 'DL123',
      licenseCategory: 'Class A',
      licenseExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
      contactNumber: '+1234567890'
    };

    it('should create a driver successfully', async () => {
      prisma.driver.findUnique.mockResolvedValue(null);
      prisma.driver.create.mockResolvedValue({ id: 'd1', ...validDriver, status: 'Available', safetyScore: 100 });

      const res = await request(app)
        .post('/api/drivers')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validDriver);

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('d1');
      expect(res.body.licenseNumber).toBe('DL123');
    });

    it('should return 400 if validation fails (missing fields)', async () => {
      const incompleteDriver = { name: 'John Doe' };
      const res = await request(app)
        .post('/api/drivers')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(incompleteDriver);

      expect(res.status).toBe(400);
    });

    it('should return 400 if license number is a duplicate', async () => {
      prisma.driver.findUnique.mockResolvedValue({ id: 'd2', licenseNumber: 'DL123' });

      const res = await request(app)
        .post('/api/drivers')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validDriver);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('unique');
    });
  });

  describe('PUT /api/drivers/:id', () => {
    it('should update a driver successfully', async () => {
      const updateData = { name: 'John Updated' };
      prisma.driver.findUnique.mockResolvedValue({ id: 'd1', licenseNumber: 'DL123' });
      prisma.driver.update.mockResolvedValue({ id: 'd1', licenseNumber: 'DL123', name: 'John Updated', status: 'Available' });

      const res = await request(app)
        .put('/api/drivers/d1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('John Updated');
    });

    it('should return 404 if driver to update is not found', async () => {
      prisma.driver.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/drivers/non-existent')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'John Updated' });

      expect(res.status).toBe(404);
    });

    it('should return 400 if updating license number to a duplicate of another driver', async () => {
      prisma.driver.findUnique.mockImplementation(async ({ where }) => {
        if (where.id === 'd1') return { id: 'd1', licenseNumber: 'DL123' };
        if (where.licenseNumber === 'DUP-999') return { id: 'd2', licenseNumber: 'DUP-999' };
        return null;
      });

      const res = await request(app)
        .put('/api/drivers/d1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ licenseNumber: 'DUP-999' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('unique');
    });
  });

  describe('DELETE /api/drivers/:id', () => {
    it('should delete a driver successfully', async () => {
      prisma.driver.findUnique.mockResolvedValue({ id: 'd1' });
      prisma.driver.delete.mockResolvedValue({ id: 'd1' });

      const res = await request(app)
        .delete('/api/drivers/d1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 404 if driver to delete is not found', async () => {
      prisma.driver.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .delete('/api/drivers/non-existent')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });
});
