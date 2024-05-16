// src/application/use-cases/FetchAndSaveStock.js
class FetchAndSaveStock {
  constructor({stockApiService, createStockUseCase}) {
    this.stockApiService = stockApiService;
    this.createStockUseCase = createStockUseCase;
  }

  async execute({userId, stockCode}) {
    console.log(this.stockApiService)
    const stockData = await this.stockApiService.fetchData(stockCode);

    const { name,
      symbol,
      open,
      high,
      low,
      close,
    } = stockData


    await this.createStockUseCase.execute({
      name,
      symbol,
      open,
      high,
      low,
      close,
      userId
    });

    return stockData;
  }
}

export default FetchAndSaveStock;
