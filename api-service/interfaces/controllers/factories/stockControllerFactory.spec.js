import { makeStockController } from './stockControllerFactory';
import StockController from '../stockController';
import CreateStock from '../../../application/use-cases/createStock';
import PrismaStockRepository from '../../../infrastructure/database/prisma/repositories/prismaStockRepository';
import StockApiService from '../../../infrastructure/external-services/stockApi';
import FetchAndSaveStock from '../../../application/use-cases/fetchAndSaveStock';
import GetStockHistory from '../../../application/use-cases/getStockHistory';
import GetStockStats from '../../../application/use-cases/getStockStats';

jest.mock('../../../application/use-cases/createStock');
jest.mock('../../../infrastructure/database/prisma/repositories/prismaStockRepository');
jest.mock('../../../infrastructure/external-services/stockApi');
jest.mock('../../../application/use-cases/fetchAndSaveStock');
jest.mock('../../../application/use-cases/getStockHistory');
jest.mock('../../../application/use-cases/getStockStats');

describe('makeStockController', () => {
  it('should create a StockController with correct dependencies', () => {
    const stockController = makeStockController();

    expect(CreateStock).toHaveBeenCalledWith(expect.any(PrismaStockRepository));
    expect(StockApiService).toHaveBeenCalledTimes(1);
    expect(FetchAndSaveStock).toHaveBeenCalledWith({
      stockApiService: expect.any(StockApiService),
      createStockUseCase: expect.any(CreateStock),
    });
    expect(GetStockHistory).toHaveBeenCalledWith(expect.any(PrismaStockRepository));
    expect(GetStockStats).toHaveBeenCalledWith(expect.any(PrismaStockRepository));
    expect(stockController).toBeInstanceOf(StockController);
  });
});
