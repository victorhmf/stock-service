import CreateStock from "../../../application/use-cases/createStock.js";
import PrismaStockRepository from "../../../infrastructure/database/prisma/repositories/prismaStockRepository.js";
import StockApiService from "../../../infrastructure/external-services/stockApi.js";
import StockController from "../stockController.js";
import FetchAndSaveStock from "../../../application/use-cases/FetchAndSaveStock.js";

export const makeStockController = () => {
  const userRepository = new PrismaStockRepository();
  const createStockUseCase = new CreateStock(userRepository);
  const stockApiService = new StockApiService()
  const fetchAndSaveStockUseCase = new FetchAndSaveStock({ stockApiService, createStockUseCase })

  return new StockController(fetchAndSaveStockUseCase);
}