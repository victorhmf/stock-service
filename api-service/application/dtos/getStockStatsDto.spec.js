import GetStockStatsDTO from './getStockStatsDto';

describe('GetStockStatsDTO', () => {
  describe('constructor', () => {
    it('should set properties correctly', () => {
      const symbol = 'AAPL';
      const count = 5;

      const getStockStatsDTO = new GetStockStatsDTO({
        symbol,
        _count: {
          symbol: count
        },
      });

      expect(getStockStatsDTO.stock).toBe(symbol);
      expect(getStockStatsDTO.times_requested).toBe(count);
    });
  });
});
