import CreateStock from './createStock';
import Stock from '../../domain/entities/stock';

jest.mock('../../domain/entities/stock');

describe('CreateStock', () => {
  let createStock;
  let stockRepository;

  beforeEach(() => {
    stockRepository = {
      create: jest.fn(),
    };
    createStock = new CreateStock(stockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    const stockData = {
      name: 'Test Stock',
      symbol: 'TST',
      open: 100,
      high: 110,
      low: 90,
      close: 105,
      userId: 'user123',
    };
    const mockStockInstance = { ...stockData };

    describe('on success', () => {
      beforeEach(() => {
        Stock.mockImplementation(() => mockStockInstance);
        stockRepository.create.mockResolvedValue(mockStockInstance);
      });

      it('should create a Stock instance with correct data', async () => {
        await createStock.execute(stockData);
        expect(Stock).toHaveBeenCalledWith(stockData);
      });

      it('should save the stock in the repository', async () => {
        await createStock.execute(stockData);
        expect(stockRepository.create).toHaveBeenCalledWith(mockStockInstance);
      });

      it('should return the created stock', async () => {
        const result = await createStock.execute(stockData);
        expect(result).toEqual(mockStockInstance);
      });
    });

    describe('on fail', () => {
      describe('by stock creation in repository', () => {
        it('should throw an error if saving stock in repository fails', async () => {
          Stock.mockImplementation(() => mockStockInstance);
          stockRepository.create.mockRejectedValue(new Error('Database error'));

          await expect(createStock.execute(stockData)).rejects.toThrow('Database error');
        });
      });
    });
  });
});
