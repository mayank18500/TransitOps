import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting full database seed...');
  
  // 1. Roles & Users (Already seeded, but keep for completeness)
  const roles = ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'];
  const createdRoles = {};
  for (const r of roles) {
    createdRoles[r] = await prisma.role.upsert({
      where: { name: r },
      update: {},
      create: { name: r },
    });
  }

  const hashedPassword = await bcrypt.hash('password123', 10);
  
  // 2. Vehicles
  const vehiclesData = [
    { registrationNumber: 'TRK-9821', name: 'Alpha 1', model: 'Volvo FH16', type: 'Heavy Duty', maxLoadCapacity: 20000, acquisitionCost: 150000, status: 'Available', odometer: 145000 },
    { registrationNumber: 'TRK-7734', name: 'Beta 2', model: 'Scania R500', type: 'Heavy Duty', maxLoadCapacity: 24000, acquisitionCost: 140000, status: 'On Trip', odometer: 89000 },
    { registrationNumber: 'TRK-1123', name: 'Gamma 3', model: 'Mercedes Actros', type: 'Heavy Duty', maxLoadCapacity: 18000, acquisitionCost: 130000, status: 'In Shop', odometer: 210000 },
    { registrationNumber: 'TRK-8812', name: 'Delta 4', model: 'Peterbilt 579', type: 'Heavy Duty', maxLoadCapacity: 22000, acquisitionCost: 145000, status: 'Available', odometer: 55000 },
  ];

  const createdVehicles = [];
  for (const v of vehiclesData) {
    const vehicle = await prisma.vehicle.upsert({
      where: { registrationNumber: v.registrationNumber },
      update: v,
      create: v,
    });
    createdVehicles.push(vehicle);
  }
  console.log('Vehicles seeded.');

  // 3. Drivers
  const driversData = [
    { name: 'Mike Johnson', licenseNumber: 'DL-44991', licenseCategory: 'Class A', licenseExpiry: new Date('2028-10-15'), contactNumber: '555-0101', safetyScore: 98, status: 'Available' },
    { name: 'Sarah Williams', licenseNumber: 'DL-22341', licenseCategory: 'Class A', licenseExpiry: new Date('2027-05-22'), contactNumber: '555-0102', safetyScore: 92, status: 'Available' },
    { name: 'John Doe', licenseNumber: 'DL-11882', licenseCategory: 'Class A', licenseExpiry: new Date('2026-11-30'), contactNumber: '555-0103', safetyScore: 85, status: 'On Trip' },
    { name: 'Jane Smith', licenseNumber: 'DL-99432', licenseCategory: 'Class B', licenseExpiry: new Date('2024-01-10'), contactNumber: '555-0104', safetyScore: 72, status: 'Suspended' },
  ];

  const createdDrivers = [];
  for (const d of driversData) {
    const driver = await prisma.driver.upsert({
      where: { licenseNumber: d.licenseNumber },
      update: d,
      create: d,
    });
    createdDrivers.push(driver);
  }
  console.log('Drivers seeded.');

  // 4. Trips
  if (createdVehicles.length >= 2 && createdDrivers.length >= 2) {
    const trip1 = await prisma.trip.create({
      data: {
        source: 'Los Angeles, CA',
        destination: 'Phoenix, AZ',
        cargoWeight: 15000,
        plannedDistance: 600,
        status: 'Dispatched',
        vehicleId: createdVehicles[1].id,
        driverId: createdDrivers[2].id,
      }
    });

    const trip2 = await prisma.trip.create({
      data: {
        source: 'Seattle, WA',
        destination: 'Portland, OR',
        cargoWeight: 18000,
        plannedDistance: 280,
        status: 'Completed',
        vehicleId: createdVehicles[0].id,
        driverId: createdDrivers[1].id,
      }
    });
    console.log('Trips seeded.');

    // 5. Fuel Logs & Expenses
    await prisma.fuelLog.create({
      data: { liters: 250, cost: 450, vehicleId: createdVehicles[1].id, tripId: trip1.id }
    });
    
    await prisma.expense.create({
      data: { description: 'Toll fees', amount: 45, vehicleId: createdVehicles[1].id, tripId: trip1.id }
    });
    console.log('Fuel logs & Expenses seeded.');
  }

  // 6. Maintenance
  await prisma.maintenance.create({
    data: {
      description: 'Engine Oil Change',
      cost: 450,
      status: 'Open',
      vehicleId: createdVehicles[0].id,
    }
  });
  
  await prisma.maintenance.create({
    data: {
      description: 'Transmission Service',
      cost: 1200,
      status: 'Closed',
      vehicleId: createdVehicles[2].id,
    }
  });
  console.log('Maintenance seeded.');

  console.log('Full database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
