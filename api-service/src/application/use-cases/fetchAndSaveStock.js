class FetchAndSaveStock {
  constructor({ stockApiService, createStockUseCase }) {
    this.stockApiService = stockApiService;
    this.createStockUseCase = createStockUseCase;
  }

  async execute({ userId, stockCode }) {
    const stockData = await this.stockApiService.fetchData(stockCode);
    if (!this.#responseIsValid(stockData)) return stockData

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

  #responseIsValid(response){
    return Object.keys(response).length
  }
}

export default FetchAndSaveStock;
