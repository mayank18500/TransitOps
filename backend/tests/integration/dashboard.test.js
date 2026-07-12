import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/lib/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../../src/lib/prisma.js', () => ({
  default: {
    fuelLog: { aggregate: vi.fn(), findMany: vi.fn() },
    maintenance: { aggregate: vi.fn(), findMany: vi.fn() },
    expense: { aggregate: vi.fn(), findMany: vi.fn() },
    vehicle: { findMany: vi.fn(), count: vi.fn() },
    trip: { findMany: vi.fn(), count: vi.fn() },
    driver: { findMany: vi.fn(), count: vi.fn(), aggregate: vi.fn() }
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
    
    // Default mocks for the new dashboard service
    prisma.vehicle.count.mockResolvedValue(0);
    prisma.trip.count.mockResolvedValue(0);
    prisma.driver.count.mockResolvedValue(0);
    
    prisma.vehicle.findMany.mockResolvedValue([]);
    prisma.trip.findMany.mockResolvedValue([]);
    prisma.driver.findMany.mockResolvedValue([]);
    prisma.maintenance.findMany.mockResolvedValue([]);
    prisma.expense.findMany.mockResolvedValue([]);
    prisma.fuelLog.findMany.mockResolvedValue([]);
    
    prisma.driver.aggregate.mockResolvedValue({ _avg: { safetyScore: 0 } });
    prisma.fuelLog.aggregate.mockResolvedValue({ _sum: { cost: 0 } });
    prisma.maintenance.aggregate.mockResolvedValue({ _sum: { cost: 0 } });
    prisma.expense.aggregate.mockResolvedValue({ _sum: { amount: 0 } });
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

      // Mock fleet status for legacy test
      prisma.vehicle.count.mockImplementation(async (args) => {
        if (!args) return 4; // Total vehicles
        if (args.where.status === 'Retired') return 1; // Retired count
        if (args.where.status === 'On Trip') return 1; // On trip count
        return 0;
      });

      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.totalOperationalCost).toBe(5000.75); // 1200.50 + 3500 + 300.25
      // 4 total - 1 retired = 3 active. 1 on trip / 3 = 33.33%
      expect(res.body.fleetUtilization).toBeCloseTo(33.33, 1);
    });

    it('should default empty cost queries to 0 and avoid division-by-zero on utilization', async () => {
      prisma.fuelLog.aggregate.mockResolvedValue({ _sum: { cost: null } });
      prisma.maintenance.aggregate.mockResolvedValue({ _sum: { cost: null } });
      prisma.expense.aggregate.mockResolvedValue({ _sum: { amount: null } });
      prisma.vehicle.count.mockResolvedValue(0);

      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${analystToken}`);

      expect(res.status).toBe(200);
      expect(res.body.totalOperationalCost).toBe(0);
      expect(res.body.fleetUtilization).toBe(0);
    });
  });
});
