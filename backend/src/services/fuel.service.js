import prisma from '../lib/prisma.js';

export const getAllFuelLogs = async () => {
  return await prisma.fuelLog.findMany();
};

export const getFuelLogById = async (id) => {
  return await prisma.fuelLog.findUnique({
    where: { id }
  });
};

export const createFuelLog = async (fuelData) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: fuelData.vehicleId }
  });
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  if (fuelData.tripId) {
    const trip = await prisma.trip.findUnique({
      where: { id: fuelData.tripId }
    });
    if (!trip) {
      throw new Error('Trip not found');
    }
  }

  return await prisma.fuelLog.create({
    data: {
      ...fuelData,
      date: fuelData.date ? new Date(fuelData.date) : new Date()
    }
  });
};

export const updateFuelLog = async (id, fuelData) => {
  const log = await prisma.fuelLog.findUnique({
    where: { id }
  });
  if (!log) {
    throw new Error('Fuel log not found');
  }

  if (fuelData.vehicleId) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: fuelData.vehicleId }
    });
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
  }

  if (fuelData.tripId) {
    const trip = await prisma.trip.findUnique({
      where: { id: fuelData.tripId }
    });
    if (!trip) {
      throw new Error('Trip not found');
    }
  }

  return await prisma.fuelLog.update({
    where: { id },
    data: fuelData
  });
};

export const deleteFuelLog = async (id) => {
  const log = await prisma.fuelLog.findUnique({
    where: { id }
  });
  if (!log) {
    throw new Error('Fuel log not found');
  }

  return await prisma.fuelLog.delete({
    where: { id }
  });
};
