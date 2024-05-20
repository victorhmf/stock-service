class StockController {
  constructor({ fetchStockUseCase }) {
    this.fetchStockUseCase = fetchStockUseCase
  }

  async getStock(req, res, next) {
    try {
      const { q: stockCode } = req.query
      const result = await this.fetchStockUseCase.execute(stockCode)

      return res.json(result);
    } catch (error) {
      next(error)
    }
  }
}

export default StockController;
