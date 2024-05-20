import GetStockHistoryDTO from './getStockHistoryDto';

describe('GetStockHistoryDTO', () => {
  describe('constructor', () => {
    it('should set properties correctly', () => {
      const createdAt = String(new Date());
      const name = 'AAPL';
      const symbol = 'AAPL';
      const open = 100.00;
      const high = 105.00;
      const low = 99.50;
      const close = 102.00;

      const getStockHistoryDTO = new GetStockHistoryDTO({
        createdAt,
        name,
        symbol,
        open,
        high,
        low,
        close,
      });

      expect(getStockHistoryDTO.date).toBe(createdAt);
      expect(getStockHistoryDTO.name).toBe(name);
      expect(getStockHistoryDTO.symbol).toBe(symbol);
      expect(getStockHistoryDTO.open).toBe(open);
      expect(getStockHistoryDTO.high).toBe(high);
      expect(getStockHistoryDTO.low).toBe(low);
      expect(getStockHistoryDTO.close).toBe(close);
    });
  });
});
