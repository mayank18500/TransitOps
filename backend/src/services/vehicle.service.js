import prisma from '../lib/prisma.js';

export const getAllVehicles = async () => {
  return await prisma.vehicle.findMany();
};

export const getVehicleById = async (id) => {
  return await prisma.vehicle.findUnique({
    where: { id },
    include: {
      maintenanceLogs: { orderBy: { date: 'desc' } },
      fuelLogs: { orderBy: { date: 'desc' } },
    }
  });
};

export const createVehicle = async (vehicleData) => {
  const existing = await prisma.vehicle.findUnique({
    where: { registrationNumber: vehicleData.registrationNumber }
  });

  if (existing) {
    throw new Error('Registration number must be unique');
  }

  return await prisma.vehicle.create({
    data: vehicleData
  });
};

export const updateVehicle = async (id, vehicleData) => {
  const existing = await prisma.vehicle.findUnique({
    where: { id }
  });

  if (!existing) {
    throw new Error('Vehicle not found');
  }

  if (vehicleData.registrationNumber) {
    const duplicate = await prisma.vehicle.findUnique({
      where: { registrationNumber: vehicleData.registrationNumber }
    });

    if (duplicate && duplicate.id !== id) {
      throw new Error('Registration number must be unique');
    }
  }

  return await prisma.vehicle.update({
    where: { id },
    data: vehicleData
  });
};

export const deleteVehicle = async (id) => {
  const existing = await prisma.vehicle.findUnique({
    where: { id }
  });

  if (!existing) {
    throw new Error('Vehicle not found');
  }

  return await prisma.vehicle.delete({
    where: { id }
  });
};
