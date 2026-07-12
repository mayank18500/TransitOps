import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Roles
  const roles = ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  // 2. Create Users
  const password = await bcrypt.hash('test1234', 10);
  const users = [
    { email: 'manager@transitops.com', roleName: 'Fleet Manager', name: 'Sarah Jenkins' },
    { email: 'dispatcher@transitops.com', roleName: 'Dispatcher', name: 'Marcus Vance' },
    { email: 'safety@transitops.com', roleName: 'Safety Officer', name: 'Elena Rostova' },
    { email: 'finance@transitops.com', roleName: 'Financial Analyst', name: 'David Kross' }
  ];

  for (const u of users) {
    const role = await prisma.role.findUnique({ where: { name: u.roleName } });
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        password: password,
        roleId: role.id
      },
    });
  }

  // 3. Clear existing data (optional, but good for fresh seed)
  await prisma.expense.deleteMany();
  await prisma.fuelLog.deleteMany();
  await prisma.maintenance.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.vehicle.deleteMany();

  // 4. Create Vehicles
  const vehicles = [];
  for (let i = 1; i <= 5; i++) {
    const v = await prisma.vehicle.create({
      data: {
        registrationNumber: `TX-${1000 + i}`,
        name: `Heavy Hauler ${i}`,
        model: 'Volvo FH16',
        type: 'Heavy Truck',
        maxLoadCapacity: 40000,
        odometer: 15000 + (i * 1000),
        acquisitionCost: 150000,
        status: i === 1 ? 'On Trip' : i === 2 ? 'In Shop' : 'Available',
      }
    });
    vehicles.push(v);
  }

  // 5. Create Drivers
  const drivers = [];
  for (let i = 1; i <= 5; i++) {
    const d = await prisma.driver.create({
      data: {
        name: `Driver ${i} Smith`,
        licenseNumber: `DL-${9000 + i}`,
        licenseCategory: 'CDL-A',
        licenseExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
        contactNumber: `555-010${i}`,
        safetyScore: 100 - (i * 2),
        status: i === 1 ? 'On Trip' : i === 5 ? 'Suspended' : 'Available',
      }
    });
    drivers.push(d);
  }

  // 6. Create Trips
  const trip1 = await prisma.trip.create({
    data: {
      source: 'Houston, TX',
      destination: 'Dallas, TX',
      cargoWeight: 35000,
      plannedDistance: 240,
      status: 'Dispatched',
      vehicleId: vehicles[0].id,
      driverId: drivers[0].id,
    }
  });

  const trip2 = await prisma.trip.create({
    data: {
      source: 'Austin, TX',
      destination: 'San Antonio, TX',
      cargoWeight: 15000,
      plannedDistance: 80,
      status: 'Draft',
      vehicleId: vehicles[2].id,
      driverId: drivers[2].id,
    }
  });

  // 7. Create Maintenance, Fuel, Expenses
  await prisma.maintenance.create({
    data: {
      description: 'Engine Oil Change',
      cost: 450,
      status: 'Open',
      vehicleId: vehicles[1].id
    }
  });

  await prisma.fuelLog.create({
    data: {
      liters: 200,
      cost: 650,
      vehicleId: vehicles[0].id,
      tripId: trip1.id
    }
  });

  await prisma.expense.create({
    data: {
      description: 'Toll Fees',
      amount: 45.50,
      vehicleId: vehicles[0].id,
      tripId: trip1.id
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
