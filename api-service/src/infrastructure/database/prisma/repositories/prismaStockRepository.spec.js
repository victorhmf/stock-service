import PrismaStockRepository from './prismaStockRepository';
import db from '../index';

jest.mock('../index', () => ({
  stock: {
    create: jest.fn(),
    findMany: jest.fn(),
    groupBy: jest.fn(),
  },
}));

describe('PrismaStockRepository', () => {
  let prismaStockRepository;

  beforeEach(() => {
    prismaStockRepository = new PrismaStockRepository();
  });

  describe('create', () => {
    it('should call db.stock.create with the correct data', async () => {
      const mockStock = { name: 'AAPL', symbol: 'AAPL.US', open: 100, high: 110, low: 90, close: 105, userId: 1 };
      await prismaStockRepository.create(mockStock);

      expect(db.stock.create).toHaveBeenCalledWith({
        data: mockStock,
      });
    });
  });

  describe('findMany', () => {
    it('should call db.stock.findMany with the correct parameters', async () => {
      const userId = 1;
      const orderBy = { createdAt: 'desc' };
      await prismaStockRepository.findMany({ userId, orderBy });

      expect(db.stock.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy,
      });
    });
  });

  describe('countRequestsBySymbol', () => {
    it('should call db.stock.groupBy with the correct parameters', async () => {
      await prismaStockRepository.countRequestsBySymbol();
      
      expect(db.stock.groupBy).toHaveBeenCalledWith({
        by: ['symbol'],
        _count: { symbol: true },
        orderBy: { _count: { symbol: 'desc' } },
        take: 5,
      });
    });
  });
});
