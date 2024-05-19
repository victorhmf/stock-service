import GetStockStats from './getStockStats';

describe('GetStockStats', () => {
  let getStockStats;
  let stockRepository;

  beforeEach(() => {
    stockRepository = {
      countRequestsBySymbol: jest.fn(),
    };
    getStockStats = new GetStockStats(stockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    const stats = [
      { symbol: 'AAPL', count: 5 },
      { symbol: 'GOOGL', count: 3 },
    ];

    describe('on success', () => {
      beforeEach(() => {
        stockRepository.countRequestsBySymbol.mockResolvedValue(stats);
      });

      it('should fetch stock stats from the repository', async () => {
        await getStockStats.execute();
        expect(stockRepository.countRequestsBySymbol).toHaveBeenCalled();
      });

      it('should return the parsed stock stats', async () => {
        const result = await getStockStats.execute();
        expect(result).toEqual(stats);
      });
    });

    describe('on fail', () => {
      describe('by error in stockRepository.countRequestsBySymbol', () => {
        it('should throw an error if fetching stock stats fails', async () => {
          stockRepository.countRequestsBySymbol.mockRejectedValue(new Error('Database error'));

          await expect(getStockStats.execute()).rejects.toThrow('Database error');
        });
      });
    });
  });
});
