import prisma from '../lib/prisma.js';

export const getAllExpenses = async () => {
  return await prisma.expense.findMany();
};

export const getExpenseById = async (id) => {
  return await prisma.expense.findUnique({
    where: { id },
    include: {
      vehicle: true,
      trip: true
    }
  });
};

export const createExpense = async (expenseData) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: expenseData.vehicleId }
  });
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  if (expenseData.tripId) {
    const trip = await prisma.trip.findUnique({
      where: { id: expenseData.tripId }
    });
    if (!trip) {
      throw new Error('Trip not found');
    }
  }

  return await prisma.expense.create({
    data: {
      ...expenseData,
      date: expenseData.date ? new Date(expenseData.date) : new Date()
    }
  });
};

export const updateExpense = async (id, expenseData) => {
  const expense = await prisma.expense.findUnique({
    where: { id }
  });
  if (!expense) {
    throw new Error('Expense not found');
  }

  if (expenseData.vehicleId) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: expenseData.vehicleId }
    });
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
  }

  if (expenseData.tripId) {
    const trip = await prisma.trip.findUnique({
      where: { id: expenseData.tripId }
    });
    if (!trip) {
      throw new Error('Trip not found');
    }
  }

  return await prisma.expense.update({
    where: { id },
    data: expenseData
  });
};

export const deleteExpense = async (id) => {
  const expense = await prisma.expense.findUnique({
    where: { id }
  });
  if (!expense) {
    throw new Error('Expense not found');
  }

  return await prisma.expense.delete({
    where: { id }
  });
};
