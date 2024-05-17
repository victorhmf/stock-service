import FetchAndSaveStock from './FetchAndSaveStock';

describe('FetchAndSaveStock', () => {
  let fetchAndSaveStock;
  let stockApiService;
  let createStockUseCase;

  beforeEach(() => {
    stockApiService = {
      fetchData: jest.fn(),
    };
    createStockUseCase = {
      execute: jest.fn(),
    };
    fetchAndSaveStock = new FetchAndSaveStock({ stockApiService, createStockUseCase });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    const userId = 'user123';
    const stockCode = 'AAPL';
    const stockData = {
      name: 'Apple Inc.',
      symbol: 'AAPL',
      open: 150,
      high: 155,
      low: 149,
      close: 152,
    };
    const invalidStockData = {};

    describe('on success', () => {
      beforeEach(() => {
        stockApiService.fetchData.mockResolvedValue(stockData);
      });

      it('should fetch stock data from the API', async () => {
        await fetchAndSaveStock.execute({ userId, stockCode });
        expect(stockApiService.fetchData).toHaveBeenCalledWith(stockCode);
      });


      it('should create a stock using createStockUseCase if data is valid', async () => {
        await fetchAndSaveStock.execute({ userId, stockCode });
        expect(createStockUseCase.execute).toHaveBeenCalledWith({
          ...stockData,
          userId,
        });
      });

      it('should return the fetched stock data', async () => {
        const result = await fetchAndSaveStock.execute({ userId, stockCode });
        expect(result).toEqual(stockData);
      });
    });

    describe('on fail', () => {
      describe('by invalid response from stockApiService', () => {
        it('should return invalid stock data without creating stock', async () => {
          stockApiService.fetchData.mockResolvedValue(invalidStockData);
          const result = await fetchAndSaveStock.execute({ userId, stockCode });

          expect(result).toEqual(invalidStockData);
          expect(createStockUseCase.execute).not.toHaveBeenCalled();
        });
      });

      describe('by error in stockApiService', () => {
        it('should throw an error if stockApiService.fetchData fails', async () => {
          stockApiService.fetchData.mockRejectedValue(new Error('API error'));

          await expect(fetchAndSaveStock.execute({ userId, stockCode })).rejects.toThrow('API error');
          expect(createStockUseCase.execute).not.toHaveBeenCalled();
        });
      });

      describe('by error in createStockUseCase', () => {
        it('should throw an error if createStockUseCase.execute fails', async () => {
          stockApiService.fetchData.mockResolvedValue(stockData);
          createStockUseCase.execute.mockRejectedValue(new Error('Database error'));


          await expect(fetchAndSaveStock.execute({ userId, stockCode })).rejects.toThrow('Database error');
        });
      });
    });
  });
});
