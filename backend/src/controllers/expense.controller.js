import * as expenseService from '../services/expense.service.js';

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { description, amount, vehicleId } = req.body;
    if (!description || amount === undefined || !vehicleId) {
      return res.status(400).json({ message: 'Missing required expense fields' });
    }

    const newExpense = await expenseService.createExpense(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    if (error.message === 'Vehicle not found' || error.message === 'Trip not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const updated = await expenseService.updateExpense(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    if (error.message === 'Expense not found' || error.message === 'Vehicle not found' || error.message === 'Trip not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await expenseService.deleteExpense(req.params.id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    if (error.message === 'Expense not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
