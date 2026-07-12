import api from '../lib/axios';

export const expenseService = {
  getAllExpenses: async () => {
    const response = await api.get('/expenses');
    return response.data;
  },
  createExpense: async (data) => {
    const response = await api.post('/expenses', data);
    return response.data;
  }
};
