import { makeStockController } from './stockControllerFactory';
import StockController from '../stockController';
import FetchStock from '../../../application/use-cases/fetchStock';
import StockApiService from '../../../infrastructure/external-services/stockApi';
import CsvToJsonParserService from '../../services/csvToJsonParser';

jest.mock('../stockController');
jest.mock('../../../application/use-cases/fetchStock');
jest.mock('../../../infrastructure/external-services/stockApi');
jest.mock('../../services/csvToJsonParser');

describe('makeStockController', () => {
  it('should create a StockController with correct dependencies', () => {
    const stockController = makeStockController();

    expect(FetchStock).toHaveBeenCalledWith({
      stockApiService: expect.any(StockApiService),
      csvToJsonParserService: expect.any(CsvToJsonParserService),
    });
    expect(StockApiService).toHaveBeenCalledTimes(1);
    expect(CsvToJsonParserService).toHaveBeenCalledTimes(1);
    expect(stockController).toBeInstanceOf(StockController);
  });
});
