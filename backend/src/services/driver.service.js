import prisma from '../lib/prisma.js';

export const getAllDrivers = async () => {
  return await prisma.driver.findMany();
};

export const getDriverById = async (id) => {
  return await prisma.driver.findUnique({
    where: { id },
    include: {
      trips: {
        include: { vehicle: true },
        orderBy: { id: 'desc' }
      }
    }
  });
};

export const createDriver = async (driverData) => {
  const existing = await prisma.driver.findUnique({
    where: { licenseNumber: driverData.licenseNumber }
  });

  if (existing) {
    throw new Error('License number must be unique');
  }

  return await prisma.driver.create({
    data: {
      ...driverData,
      licenseExpiry: new Date(driverData.licenseExpiry)
    }
  });
};

export const updateDriver = async (id, driverData) => {
  const existing = await prisma.driver.findUnique({
    where: { id }
  });

  if (!existing) {
    throw new Error('Driver not found');
  }

  if (driverData.licenseNumber) {
    const duplicate = await prisma.driver.findUnique({
      where: { licenseNumber: driverData.licenseNumber }
    });

    if (duplicate && duplicate.id !== id) {
      throw new Error('License number must be unique');
    }
  }

  const updatedData = { ...driverData };
  if (driverData.licenseExpiry) {
    updatedData.licenseExpiry = new Date(driverData.licenseExpiry);
  }

  return await prisma.driver.update({
    where: { id },
    data: updatedData
  });
};

export const deleteDriver = async (id) => {
  const existing = await prisma.driver.findUnique({
    where: { id }
  });

  if (!existing) {
    throw new Error('Driver not found');
  }

  return await prisma.driver.delete({
    where: { id }
  });
};
