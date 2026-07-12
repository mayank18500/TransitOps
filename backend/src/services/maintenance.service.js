import prisma from '../lib/prisma.js';

export const getAllMaintenance = async () => {
  return await prisma.maintenance.findMany();
};

export const createMaintenance = async (maintenanceData) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: maintenanceData.vehicleId }
  });

  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  const record = await prisma.maintenance.create({
    data: {
      ...maintenanceData,
      date: maintenanceData.date ? new Date(maintenanceData.date) : new Date()
    }
  });

  // If maintenance status is active ("Open"), set the associated vehicle's status to "In Shop"
  if (record.status === 'Open') {
    await prisma.vehicle.update({
      where: { id: record.vehicleId },
      data: { status: 'In Shop' }
    });
  }

  return record;
};
