import GetStockHistory from './getStockHistory';

describe('GetStockHistory', () => {
  let getStockHistory;
  let stockRepository;

  beforeEach(() => {
    stockRepository = {
      findMany: jest.fn(),
    };
    getStockHistory = new GetStockHistory(stockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    const userId = 'user123';
    const stockHistory = [
      { id: 1, symbol: 'AAPL', createdAt: new Date('2024-05-01') },
      { id: 2, symbol: 'GOOGL', createdAt: new Date('2024-05-02') },
    ];

    describe('on success', () => {
      beforeEach(() => {
        stockRepository.findMany.mockResolvedValue(stockHistory);
      });

      it('should fetch stock history from the repository', async () => {
        await getStockHistory.execute(userId);
        expect(stockRepository.findMany).toHaveBeenCalledWith({ userId, orderBy: { createdAt: 'desc' } });
      });

      it('should return stock history', async () => {
        const result = await getStockHistory.execute(userId);
        expect(result).toEqual(stockHistory);
      });
    });

    describe('on fail', () => {
      it('should throw an error if fetching stock history fails', async () => {
        stockRepository.findMany.mockRejectedValue(new Error('Database error'));

        await expect(getStockHistory.execute(userId)).rejects.toThrow('Database error');
      });
    });
  });
});
