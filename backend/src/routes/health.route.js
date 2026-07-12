import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is healthy' });
});

export default router;
