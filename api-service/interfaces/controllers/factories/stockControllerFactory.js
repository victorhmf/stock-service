import CreateStock from "../../../application/use-cases/createStock.js";
import PrismaStockRepository from "../../../infrastructure/database/prisma/repositories/prismaStockRepository.js";
import StockApiService from "../../../infrastructure/external-services/stockApi.js";
import StockController from "../stockController.js";
import FetchAndSaveStock from "../../../application/use-cases/fetchAndSaveStock.js";
import GetStockHistory from "../../../application/use-cases/getStockHistory.js";
import GetStockStats from "../../../application/use-cases/getStockStats.js";

export const makeStockController = () => {
  const stockRepository = new PrismaStockRepository();
  const createStockUseCase = new CreateStock(stockRepository);
  const stockApiService = new StockApiService()
  const fetchAndSaveStockUseCase = new FetchAndSaveStock({ stockApiService, createStockUseCase })

  const getStockHistoryUseCase = new GetStockHistory(stockRepository)
  const getStockStatsUseCase = new GetStockStats(stockRepository)

  return new StockController({ fetchAndSaveStockUseCase, getStockHistoryUseCase, getStockStatsUseCase });
}