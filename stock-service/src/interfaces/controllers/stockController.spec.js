import StockController from './stockController';

describe('StockController', () => {
  let stockController;
  let fetchStockUseCase;
  let req;
  let res;
  let next;

  beforeEach(() => {
    fetchStockUseCase = {
      execute: jest.fn(),
    };
    stockController = new StockController({ fetchStockUseCase });
    req = {
      query: {
        q: 'AAPL',
      },
    };
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStock', () => {
    it('should call fetchStockUseCase execute with stock code from query', async () => {
      await stockController.getStock(req, res, next);

      expect(fetchStockUseCase.execute).toHaveBeenCalledWith(req.query.q);
    });

    it('should return JSON response with fetched stock data', async () => {
      const mockStockData = {
        name: 'Apple Inc.',
        symbol: 'AAPL',
        open: 120.05,
        high: 122.45,
        low: 119.67,
        close: 121.78,
      };
      fetchStockUseCase.execute.mockResolvedValueOnce(mockStockData);

      await stockController.getStock(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockStockData);
    });

    it('should call next with error if fetchStockUseCase execute throws an error', async () => {
      const error = new Error('Failed to fetch stock data');
      fetchStockUseCase.execute.mockRejectedValueOnce(error);

      await stockController.getStock(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
