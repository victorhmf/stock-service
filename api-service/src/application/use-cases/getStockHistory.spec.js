import GetStockHistory from './getStockHistory';
import GetStockHistoryDTO from '../dtos/getStockHistoryDto';

jest.mock('../dtos/getStockHistoryDto');

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
    const parsedStockHistory = [
      { symbol: 'AAPL', createdAt: new Date('2024-05-01') },
      { symbol: 'GOOGL', createdAt: new Date('2024-05-02') },
    ];

    describe('on success', () => {
      beforeEach(() => {
        stockRepository.findMany.mockResolvedValue(stockHistory);
        GetStockHistoryDTO.mockImplementation((item) => ({ symbol: item.symbol, createdAt: item.createdAt }));
      });

      it('should fetch stock history from the repository', async () => {
        await getStockHistory.execute(userId);
        expect(stockRepository.findMany).toHaveBeenCalledWith({ userId, orderBy: { createdAt: 'desc' } });
      });

      it('should parse the fetched stock history using DTO', async () => {
        await getStockHistory.execute(userId);
        expect(GetStockHistoryDTO).toHaveBeenCalledTimes(2);
        expect(GetStockHistoryDTO).toHaveBeenCalledWith(stockHistory[0]);
        expect(GetStockHistoryDTO).toHaveBeenCalledWith(stockHistory[1]);
      });

      it('should return the parsed stock history', async () => {
        const result = await getStockHistory.execute(userId);
        expect(result).toEqual(parsedStockHistory);
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
