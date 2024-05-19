import StockController from './stockController';

describe('StockController', () => {
  let stockController;
  let fetchAndSaveStockUseCase;
  let getStockHistoryUseCase;
  let getStockStatsUseCase;
  let req;
  let res;
  let next;

  beforeEach(() => {
    fetchAndSaveStockUseCase = {
      execute: jest.fn(),
    };
    getStockHistoryUseCase = {
      execute: jest.fn(),
    };
    getStockStatsUseCase = {
      execute: jest.fn(),
    };
    stockController = new StockController({
      fetchAndSaveStockUseCase,
      getStockHistoryUseCase,
      getStockStatsUseCase,
    });
    req = {
      user: { id: 'user123' },
      query: { q: 'stockCode' },
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
    it('should call fetchAndSaveStockUseCase execute with userId and stockCode from request', async () => {
      await stockController.getStock(req, res, next);

      expect(fetchAndSaveStockUseCase.execute).toHaveBeenCalledWith({
        userId: req.user.id,
        stockCode: req.query.q,
      });
    });

    it('should return the result in JSON response', async () => {
      const result = {};
      fetchAndSaveStockUseCase.execute.mockResolvedValueOnce(result);

      await stockController.getStock(req, res, next);

      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('should call next with error if fetchAndSaveStockUseCase execute throws an error', async () => {
      const error = new Error('Failed to fetch and save stock.');
      fetchAndSaveStockUseCase.execute.mockRejectedValueOnce(error);

      await stockController.getStock(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getStockHistory', () => {
    it('should call getStockHistoryUseCase execute with userId from request', async () => {
      await stockController.getStockHistory(req, res, next);

      expect(getStockHistoryUseCase.execute).toHaveBeenCalledWith(req.user.id);
    });

    it('should return the result in JSON response', async () => {
      const result = [];
      getStockHistoryUseCase.execute.mockResolvedValueOnce(result);

      await stockController.getStockHistory(req, res, next);

      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('should call next with error if getStockHistoryUseCase execute throws an error', async () => {
      const error = new Error('Failed to get stock history.');
      getStockHistoryUseCase.execute.mockRejectedValueOnce(error);

      await stockController.getStockHistory(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getStockStats', () => {
    it('should call getStockStatsUseCase execute', async () => {
      await stockController.getStockStats(req, res, next);

      expect(getStockStatsUseCase.execute).toHaveBeenCalled();
    });

    it('should return the result in JSON response', async () => {
      const result = {};
      getStockStatsUseCase.execute.mockResolvedValueOnce(result);

      await stockController.getStockStats(req, res, next);

      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('should call next with error if getStockStatsUseCase execute throws an error', async () => {
      const error = new Error('Failed to get stock stats.');
      getStockStatsUseCase.execute.mockRejectedValueOnce(error);

      await stockController.getStockStats(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
