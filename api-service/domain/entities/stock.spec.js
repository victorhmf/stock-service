import Stock from './stock.js';

describe('Stock Entity', () => {
  let stock;
  const initialData = {
    id: '1',
    name: 'Test Stock',
    symbol: 'TST',
    open: 100,
    high: 110,
    low: 90,
    close: 105,
    userId: 'user123',
  };

  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2024, 1, 1));

    stock = new Stock(initialData);

    jest.useFakeTimers('modern').setSystemTime(new Date(2025, 1, 1));
  });

  afterAll(() => {
    jest.clearAllMocks()
  });

  it('should correctly set initial values through the constructor', () => {
    expect(stock.id).toBe(initialData.id);
    expect(stock.name).toBe(initialData.name);
    expect(stock.symbol).toBe(initialData.symbol);
    expect(stock.open).toBe(initialData.open);
    expect(stock.high).toBe(initialData.high);
    expect(stock.low).toBe(initialData.low);
    expect(stock.close).toBe(initialData.close);
    expect(stock.userId).toBe(initialData.userId);
    expect(stock.createdAt).toBeInstanceOf(Date);
    expect(stock.updatedAt).toBeInstanceOf(Date);
    expect(stock.createdAt).toEqual(stock.updatedAt);
  });

  it('should update name and updatedAt when name is set', () => {
    const newName = 'New Test Stock';
    stock.name = newName;

    expect(stock.name).toBe(newName);
    expect(stock.updatedAt).not.toEqual(stock.createdAt);
  });

  it('should update symbol and updatedAt when symbol is set', () => {
    const newSymbol = 'NEW';
    stock.symbol = newSymbol;

    expect(stock.symbol).toBe(newSymbol);
    expect(stock.updatedAt).not.toEqual(stock.createdAt);
  });

  it('should update open and updatedAt when open is set', () => {
    const newOpen = 120;
    stock.open = newOpen;

    expect(stock.open).toBe(newOpen);
    expect(stock.updatedAt).not.toEqual(stock.createdAt);
  });

  it('should update high and updatedAt when high is set', () => {
    const newHigh = 130;
    stock.high = newHigh;

    expect(stock.high).toBe(newHigh);
    expect(stock.updatedAt).not.toEqual(stock.createdAt);
  });

  it('should update low and updatedAt when low is set', () => {
    const newLow = 80;
    stock.low = newLow;

    expect(stock.low).toBe(newLow);
    expect(stock.updatedAt).not.toEqual(stock.createdAt);
  });

  it('should update close and updatedAt when close is set', () => {
    const newclose = 80;
    stock.close = newclose;

    expect(stock.close).toBe(newclose);
    expect(stock.updatedAt).not.toEqual(stock.createdAt);
  });
})