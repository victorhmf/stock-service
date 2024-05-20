
import PrismaStockRepository from "../../src/infrastructure/database/prisma/repositories/prismaStockRepository";
import CreateStock from "../../src/application/use-cases/createStock";

export const createStock = async (params) => {
  const prismaStockRepository = new PrismaStockRepository()
  const createStockUseCase = new CreateStock(prismaStockRepository)
  const stock = await createStockUseCase.execute(params)

  return stock
}