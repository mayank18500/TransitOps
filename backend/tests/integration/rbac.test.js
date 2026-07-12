import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { verifyToken } from '../../src/middleware/auth.middleware.js';
import { requireRole } from '../../src/middleware/rbac.middleware.js';
import jwt from 'jsonwebtoken';

const app = express();
app.get('/protected', verifyToken, requireRole(['Fleet Manager']), (req, res) => res.status(200).json({ success: true }));

describe('RBAC Middleware', () => {
  it('should deny access if token is missing (401)', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
  });

  it('should deny access if role does not match (403)', async () => {
    const token = jwt.sign({ userId: '1', role: 'Driver' }, process.env.JWT_SECRET || 'fallback_secret');
    const res = await request(app).get('/protected').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('should grant access if role matches (200)', async () => {
    const token = jwt.sign({ userId: '1', role: 'Fleet Manager' }, process.env.JWT_SECRET || 'fallback_secret');
    const res = await request(app).get('/protected').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
