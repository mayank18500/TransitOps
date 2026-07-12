import prisma from '../lib/prisma.js';

export const getAllTrips = async () => {
  return await prisma.trip.findMany();
};

export const getTripById = async (id) => {
  return await prisma.trip.findUnique({
    where: { id },
    include: {
      vehicle: true,
      driver: true
    }
  });
};

export const createTrip = async (tripData) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: tripData.vehicleId }
  });
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  const driver = await prisma.driver.findUnique({
    where: { id: tripData.driverId }
  });
  if (!driver) {
    throw new Error('Driver not found');
  }

  return await prisma.trip.create({
    data: {
      ...tripData,
      status: 'Draft'
    }
  });
};

export const updateTrip = async (id, tripData) => {
  const trip = await prisma.trip.findUnique({
    where: { id }
  });
  if (!trip) {
    throw new Error('Trip not found');
  }
  if (trip.status !== 'Draft') {
    throw new Error('Only draft trips can be updated');
  }

  return await prisma.trip.update({
    where: { id },
    data: tripData
  });
};

export const deleteTrip = async (id) => {
  const trip = await prisma.trip.findUnique({
    where: { id }
  });
  if (!trip) {
    throw new Error('Trip not found');
  }
  if (trip.status !== 'Draft') {
    throw new Error('Only draft trips can be deleted');
  }

  return await prisma.trip.delete({
    where: { id }
  });
};

export const dispatchTrip = async (id) => {
  const trip = await prisma.trip.findUnique({
    where: { id }
  });
  if (!trip) {
    throw new Error('Trip not found');
  }
  if (trip.status !== 'Draft') {
    throw new Error('Only draft trips can be dispatched');
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: trip.vehicleId }
  });
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  const driver = await prisma.driver.findUnique({
    where: { id: trip.driverId }
  });
  if (!driver) {
    throw new Error('Driver not found');
  }

  // Validations
  if (trip.cargoWeight > vehicle.maxLoadCapacity) {
    throw new Error('Cargo weight exceeds vehicle capacity');
  }
  if (driver.status === 'Suspended') {
    throw new Error('Driver license is suspended');
  }
  if (vehicle.status === 'In Shop') {
    throw new Error('Vehicle is currently undergoing maintenance');
  }
  if (vehicle.status === 'On Trip') {
    throw new Error('Vehicle is already assigned to an active trip');
  }
  if (driver.status === 'On Trip') {
    throw new Error('Driver is already assigned to an active trip');
  }
  if (driver.status === 'Off Duty') {
    throw new Error('Driver is off duty and unavailable');
  }
  if (vehicle.status === 'Retired') {
    throw new Error('Vehicle has been retired from service');
  }

  const updatedTrip = await prisma.trip.update({
    where: { id },
    data: { status: 'Dispatched' }
  });

  await prisma.vehicle.update({
    where: { id: trip.vehicleId },
    data: { status: 'On Trip' }
  });

  await prisma.driver.update({
    where: { id: trip.driverId },
    data: { status: 'On Trip' }
  });

  return updatedTrip;
};

export const completeTrip = async (id) => {
  const trip = await prisma.trip.findUnique({
    where: { id }
  });
  if (!trip) {
    throw new Error('Trip not found');
  }
  if (trip.status !== 'Dispatched') {
    throw new Error('Only dispatched trips can be completed');
  }

  const updatedTrip = await prisma.trip.update({
    where: { id },
    data: { status: 'Completed' }
  });

  await prisma.vehicle.update({
    where: { id: trip.vehicleId },
    data: { status: 'Available' }
  });

  await prisma.driver.update({
    where: { id: trip.driverId },
    data: { status: 'Available' }
  });

  return updatedTrip;
};

export const cancelTrip = async (id) => {
  const trip = await prisma.trip.findUnique({
    where: { id }
  });
  if (!trip) {
    throw new Error('Trip not found');
  }
  if (trip.status === 'Completed' || trip.status === 'Cancelled') {
    throw new Error('Completed or cancelled trips cannot be cancelled');
  }

  if (trip.status === 'Dispatched') {
    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: { status: 'Cancelled' }
    });

    await prisma.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: 'Available' }
    });

    await prisma.driver.update({
      where: { id: trip.driverId },
      data: { status: 'Available' }
    });

    return updatedTrip;
  }

  // If status is Draft
  return await prisma.trip.update({
    where: { id },
    data: { status: 'Cancelled' }
  });
};
