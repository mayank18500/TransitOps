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
    { email: 'manager@transitops.com', roleName: 'Fleet Manager' },
    { email: 'dispatcher@transitops.com', roleName: 'Dispatcher' },
    { email: 'safety@transitops.com', roleName: 'Safety Officer' },
    { email: 'finance@transitops.com', roleName: 'Financial Analyst' }
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

  console.log('Seeding finished.');
  console.log('-------------------------------------------');
  console.log('Demo Accounts created (Password for all: test1234):');
  for (const u of users) {
    console.log(`- ${u.roleName}: ${u.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
