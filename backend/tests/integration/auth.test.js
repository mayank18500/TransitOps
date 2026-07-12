import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/lib/prisma.js';
import bcrypt from 'bcryptjs';

vi.mock('../../src/lib/prisma.js', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe('Auth Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 401 for invalid credentials (user not found)', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const response = await request(app).post('/api/auth/login').send({ email: 'test@test.com', password: 'wrong' });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 401 for invalid password', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    prisma.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      password: hashedPassword,
      role: { name: 'Fleet Manager' },
    });
    const response = await request(app).post('/api/auth/login').send({ email: 'test@test.com', password: 'wrongpassword' });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 200 and a token for valid credentials', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    prisma.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      password: hashedPassword,
      role: { name: 'Fleet Manager' },
    });
    const response = await request(app).post('/api/auth/login').send({ email: 'test@test.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.role).toBe('Fleet Manager');
  });
});
