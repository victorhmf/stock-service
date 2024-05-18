import { PrismaClient } from  '@prisma/client' ;

async function createTestDatabase() {
  const prisma = new PrismaClient();

  try {
    await prisma.$executeRaw`CREATE DATABASE test`;

    console.log('Test database created successfully.');
  } catch (error) {
    console.error('Error creating test database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

(async() => await createTestDatabase())();