import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_USERS = [
  {
    email: 'manager@transitops.com',
    password: 'password123',
    name: 'Sarah Jenkins',
    role: 'Fleet Manager',
  },
  {
    email: 'dispatcher@transitops.com',
    password: 'password123',
    name: 'Marcus Vance',
    role: 'Dispatcher',
  },
  {
    email: 'safety@transitops.com',
    password: 'password123',
    name: 'Elena Rostova',
    role: 'Safety Officer',
  },
  {
    email: 'analyst@transitops.com',
    password: 'password123',
    name: 'David Kross',
    role: 'Financial Analyst',
  },
];

async function main() {
  console.log('Starting seed...');
  
  for (const demoUser of DEMO_USERS) {
    // Upsert the role
    const role = await prisma.role.upsert({
      where: { name: demoUser.role },
      update: {},
      create: { name: demoUser.role },
    });

    const hashedPassword = await bcrypt.hash(demoUser.password, 10);

    // Upsert the user
    await prisma.user.upsert({
      where: { email: demoUser.email },
      update: { password: hashedPassword, roleId: role.id },
      create: {
        email: demoUser.email,
        password: hashedPassword,
        roleId: role.id,
      },
    });
    console.log(`Created/Updated user: ${demoUser.email}`);
  }
  
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
