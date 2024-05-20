import FetchStockDTO from './fetchStockDto';

describe('FetchStockDTO', () => {
  describe('constructor', () => {
    it('should create a FetchStockDTO instance with correct properties', () => {
      const data = {
        Name: 'Test Stock',
        Symbol: 'TST',
        Open: '100',
        High: '110',
        Low: '90',
        Close: '105',
      };

      const fetchStockDTO = new FetchStockDTO(data);

      expect(fetchStockDTO.name).toBe(data.Name);
      expect(fetchStockDTO.symbol).toBe(data.Symbol);
      expect(fetchStockDTO.open).toBe(Number(data.Open));
      expect(fetchStockDTO.high).toBe(Number(data.High));
      expect(fetchStockDTO.low).toBe(Number(data.Low));
      expect(fetchStockDTO.close).toBe(Number(data.Close));
    });

    it('should convert string numeric values to numbers', () => {
      const data = {
        Name: 'Test Stock',
        Symbol: 'TST',
        Open: '100',
        High: '110',
        Low: '90',
        Close: '105',
      };

      const fetchStockDTO = new FetchStockDTO(data);

      expect(typeof fetchStockDTO.open).toBe('number');
      expect(typeof fetchStockDTO.high).toBe('number');
      expect(typeof fetchStockDTO.low).toBe('number');
      expect(typeof fetchStockDTO.close).toBe('number');
    });
  });
});
