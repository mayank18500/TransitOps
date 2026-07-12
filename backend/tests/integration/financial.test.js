import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/lib/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../../src/lib/prisma.js', () => ({
  default: {
    fuelLog: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    expense: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    vehicle: {
      findUnique: vi.fn(),
    },
    trip: {
      findUnique: vi.fn(),
    },
  },
}));

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const adminToken = jwt.sign({ userId: 'admin-1', role: 'Fleet Manager' }, JWT_SECRET);
const analystToken = jwt.sign({ userId: 'analyst-1', role: 'Financial Analyst' }, JWT_SECRET);
const dispatcherToken = jwt.sign({ userId: 'dispatcher-1', role: 'Dispatcher' }, JWT_SECRET);
const driverToken = jwt.sign({ userId: 'driver-1', role: 'Driver' }, JWT_SECRET);

describe('Financials Endpoints (Fuel & Expenses)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authorization Checks', () => {
    it('should deny fuel endpoints to unauthorized roles (e.g. Driver)', async () => {
      const res = await request(app)
        .get('/api/fuel')
        .set('Authorization', `Bearer ${driverToken}`);
      expect(res.status).toBe(403);
    });

    it('should allow Financial Analyst to access fuel endpoints', async () => {
      prisma.fuelLog.findMany.mockResolvedValue([]);
      const res = await request(app)
        .get('/api/fuel')
        .set('Authorization', `Bearer ${analystToken}`);
      expect(res.status).toBe(200);
    });

    it('should deny expense endpoints to unauthorized roles (e.g. Dispatcher)', async () => {
      const res = await request(app)
        .get('/api/expenses')
        .set('Authorization', `Bearer ${dispatcherToken}`);
      expect(res.status).toBe(403);
    });

    it('should allow Fleet Manager to access expense endpoints', async () => {
      prisma.expense.findMany.mockResolvedValue([]);
      const res = await request(app)
        .get('/api/expenses')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });
  });

  describe('Fuel Logs Endpoints', () => {
    const validFuelData = {
      liters: 45.5,
      cost: 90.25,
      vehicleId: 'v1',
      tripId: 't1'
    };

    it('should create a fuel log successfully', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v1' });
      prisma.trip.findUnique.mockResolvedValue({ id: 't1' });
      prisma.fuelLog.create.mockResolvedValue({ id: 'f1', ...validFuelData });

      const res = await request(app)
        .post('/api/fuel')
        .set('Authorization', `Bearer ${analystToken}`)
        .send(validFuelData);

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('f1');
      expect(res.body.cost).toBe(90.25);
    });

    it('should return 400 if fuel log missing required parameters', async () => {
      const incomplete = { cost: 90.25 };
      const res = await request(app)
        .post('/api/fuel')
        .set('Authorization', `Bearer ${analystToken}`)
        .send(incomplete);

      expect(res.status).toBe(400);
    });

    it('should return 404 if vehicle does not exist', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/fuel')
        .set('Authorization', `Bearer ${analystToken}`)
        .send(validFuelData);

      expect(res.status).toBe(404);
      expect(prisma.fuelLog.create).not.toHaveBeenCalled();
    });

    it('should return 404 if trip is provided but does not exist', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v1' });
      prisma.trip.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/fuel')
        .set('Authorization', `Bearer ${analystToken}`)
        .send(validFuelData);

      expect(res.status).toBe(404);
    });

    it('should retrieve all fuel logs', async () => {
      const mockLogs = [{ id: 'f1', liters: 40, cost: 80, vehicleId: 'v1' }];
      prisma.fuelLog.findMany.mockResolvedValue(mockLogs);

      const res = await request(app)
        .get('/api/fuel')
        .set('Authorization', `Bearer ${analystToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockLogs);
    });

    it('should retrieve a single fuel log by ID', async () => {
      prisma.fuelLog.findUnique.mockResolvedValue({ id: 'f1', cost: 80 });

      const res = await request(app)
        .get('/api/fuel/f1')
        .set('Authorization', `Bearer ${analystToken}`);

      expect(res.status).toBe(200);
      expect(res.body.cost).toBe(80);
    });

    it('should return 404 if fuel log not found on GET', async () => {
      prisma.fuelLog.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .get('/api/fuel/non-existent')
        .set('Authorization', `Bearer ${analystToken}`);

      expect(res.status).toBe(404);
    });

    it('should update fuel log successfully', async () => {
      prisma.fuelLog.findUnique.mockResolvedValue({ id: 'f1' });
      prisma.fuelLog.update.mockResolvedValue({ id: 'f1', cost: 100 });

      const res = await request(app)
        .put('/api/fuel/f1')
        .set('Authorization', `Bearer ${analystToken}`)
        .send({ cost: 100 });

      expect(res.status).toBe(200);
      expect(res.body.cost).toBe(100);
    });

    it('should delete a fuel log successfully', async () => {
      prisma.fuelLog.findUnique.mockResolvedValue({ id: 'f1' });
      prisma.fuelLog.delete.mockResolvedValue({ id: 'f1' });

      const res = await request(app)
        .delete('/api/fuel/f1')
        .set('Authorization', `Bearer ${analystToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('Expenses Endpoints', () => {
    const validExpenseData = {
      description: 'Highway toll',
      amount: 15.5,
      vehicleId: 'v1',
      tripId: 't1'
    };

    it('should create an expense successfully', async () => {
      prisma.vehicle.findUnique.mockResolvedValue({ id: 'v1' });
      prisma.trip.findUnique.mockResolvedValue({ id: 't1' });
      prisma.expense.create.mockResolvedValue({ id: 'e1', ...validExpenseData });

      const res = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validExpenseData);

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('e1');
      expect(res.body.amount).toBe(15.5);
    });

    it('should return 400 if expense missing required parameters', async () => {
      const incomplete = { description: 'highway toll' };
      const res = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(incomplete);

      expect(res.status).toBe(400);
    });

    it('should return 404 if vehicle does not exist for expense', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validExpenseData);

      expect(res.status).toBe(404);
    });

    it('should retrieve all expenses', async () => {
      const mockExpenses = [{ id: 'e1', description: 'toll', amount: 15 }];
      prisma.expense.findMany.mockResolvedValue(mockExpenses);

      const res = await request(app)
        .get('/api/expenses')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockExpenses);
    });

    it('should retrieve single expense by ID', async () => {
      prisma.expense.findUnique.mockResolvedValue({ id: 'e1', amount: 15 });

      const res = await request(app)
        .get('/api/expenses/e1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.amount).toBe(15);
    });

    it('should return 404 if expense not found on GET', async () => {
      prisma.expense.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .get('/api/expenses/non-existent')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });

    it('should update expense successfully', async () => {
      prisma.expense.findUnique.mockResolvedValue({ id: 'e1' });
      prisma.expense.update.mockResolvedValue({ id: 'e1', amount: 20 });

      const res = await request(app)
        .put('/api/expenses/e1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ amount: 20 });

      expect(res.status).toBe(200);
      expect(res.body.amount).toBe(20);
    });

    it('should delete expense successfully', async () => {
      prisma.expense.findUnique.mockResolvedValue({ id: 'e1' });
      prisma.expense.delete.mockResolvedValue({ id: 'e1' });

      const res = await request(app)
        .delete('/api/expenses/e1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });
  });
});
