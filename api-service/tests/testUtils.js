import db from '../src/infrastructure/database/prisma/index'

export const cleanUpDB = async () => {
  const tablenames = await db.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname='public';
  `;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      await db.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
    }
  }

};

export const disconnectDB = async () => {
    await db.$disconnect();
}

