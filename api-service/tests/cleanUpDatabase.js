import db from '../infrastructure/database/prisma/index'

const cleanUpDatabase = async () => {
  const tablenames = await db.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname='public';
  `;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      await db.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
    }
  }

  await db.$disconnect();
};

export default cleanUpDatabase