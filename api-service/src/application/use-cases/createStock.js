import Stock from "../../domain/entities/stock.js";

class CreateStock {
  constructor(stockRepository) {
    this.stockRepository = stockRepository;
  }

  async execute({ name, symbol, open, high, low, close, userId}) {

    const stock = new Stock({
      name,
      symbol,
      open,
      high,
      low,
      close,
      userId,
    })

    return await this.stockRepository.create(stock);
  }
}
export default CreateStock;
