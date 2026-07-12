import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/lib/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../../src/lib/prisma.js', () => ({
  default: {
    fuelLog: {
      aggregate: vi.fn(),
    },
    maintenance: {
      aggregate: vi.fn(),
    },
    expense: {
      aggregate: vi.fn(),
    },
    vehicle: {
      findMany: vi.fn(),
    },
  },
}));

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const adminToken = jwt.sign({ userId: 'admin-1', role: 'Fleet Manager' }, JWT_SECRET);
const dispatcherToken = jwt.sign({ userId: 'dispatcher-1', role: 'Dispatcher' }, JWT_SECRET);
const analystToken = jwt.sign({ userId: 'analyst-1', role: 'Financial Analyst' }, JWT_SECRET);
const driverToken = jwt.sign({ userId: 'driver-1', role: 'Driver' }, JWT_SECRET);

describe('Dashboard Analytics Endpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authorization Checks', () => {
    it('should return 401 if token is missing', async () => {
      const res = await request(app).get('/api/dashboard');
      expect(res.status).toBe(401);
    });

    it('should return 403 if role is not Fleet Manager, Dispatcher, or Financial Analyst', async () => {
      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${driverToken}`);
      expect(res.status).toBe(403);
    });

    it('should allow Dispatcher to retrieve dashboard stats', async () => {
      prisma.fuelLog.aggregate.mockResolvedValue({ _sum: { cost: null } });
      prisma.maintenance.aggregate.mockResolvedValue({ _sum: { cost: null } });
      prisma.expense.aggregate.mockResolvedValue({ _sum: { amount: null } });
      prisma.vehicle.findMany.mockResolvedValue([]);

      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${dispatcherToken}`);
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/dashboard (Aggregates & Utilization)', () => {
    it('should aggregate costs and calculate utilization correctly', async () => {
      // Mock costs
      prisma.fuelLog.aggregate.mockResolvedValue({ _sum: { cost: 1200.50 } });
      prisma.maintenance.aggregate.mockResolvedValue({ _sum: { cost: 3500.00 } });
      prisma.expense.aggregate.mockResolvedValue({ _sum: { amount: 300.25 } });

      // Mock fleet status
      // Total vehicles: 4, Retired: 1. Operational denominator = 3. On Trip: 1. Utilization = (1/3)*100 = 33.33%
      prisma.vehicle.findMany.mockResolvedValue([
        { id: 'v1', status: 'On Trip' },
        { id: 'v2', status: 'Available' },
        { id: 'v3', status: 'Retired' },
        { id: 'v4', status: 'Available' }
      ]);

      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.totalOperationalCost).toBe(5000.75); // 1200.50 + 3500 + 300.25
      expect(res.body.fleetUtilization).toBeCloseTo(33.33, 1);
    });

    it('should default empty cost queries to 0 and avoid division-by-zero on utilization', async () => {
      prisma.fuelLog.aggregate.mockResolvedValue({ _sum: { cost: null } });
      prisma.maintenance.aggregate.mockResolvedValue({ _sum: { cost: null } });
      prisma.expense.aggregate.mockResolvedValue({ _sum: { amount: null } });
      prisma.vehicle.findMany.mockResolvedValue([]); // Total: 0, denominator: 0

      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${analystToken}`);

      expect(res.status).toBe(200);
      expect(res.body.totalOperationalCost).toBe(0);
      expect(res.body.fleetUtilization).toBe(0);
    });
  });
});
