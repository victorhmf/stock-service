import StockRepository from './stockRepository';

describe('StockRepository', () => {
  let stockRepository;

  beforeEach(() => {
    stockRepository = new StockRepository();
  });

  describe('create', () => {
    it('should throw an error when called', () => {
      expect(() => stockRepository.create()).toThrow('Not implemented');
    });
  });

  describe('findMany', () => {
    it('should throw an error when called', () => {
      expect(() => stockRepository.findMany({ userId: 123, orderBy: 'createdAt' })).toThrow('Not implemented');
    });
  });

  describe('countRequestsBySymbol', () => {
    it('should throw an error when called', () => {
      expect(() => stockRepository.countRequestsBySymbol()).toThrow('Not implemented');
    });
  });
});
