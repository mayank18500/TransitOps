import { Router } from 'express';
import * as expenseController from '../controllers/expense.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/', expenseController.getAllExpenses);
router.get('/:id', expenseController.getExpenseById);
router.post('/', requireRole(['Financial Analyst', 'Fleet Manager']), expenseController.createExpense);
router.put('/:id', requireRole(['Financial Analyst', 'Fleet Manager']), expenseController.updateExpense);
router.delete('/:id', requireRole(['Financial Analyst', 'Fleet Manager']), expenseController.deleteExpense);

export default router;
