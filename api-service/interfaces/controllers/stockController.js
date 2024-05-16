class StockController {
  constructor({ fetchAndSaveStockUseCase, getStockHistoryUseCase }) {
    this.fetchAndSaveStockUseCase = fetchAndSaveStockUseCase
    this.getStockHistoryUseCase = getStockHistoryUseCase
  }

  async getStock(req, res, next) {
    try {
      const { id: userId } = req.user
      const { q: stockCode } = req.query
      const result = await this.fetchAndSaveStockUseCase.execute({ userId, stockCode })

      return res.json(result);
    } catch (error) {
      next(error)
    }
  }

  async getStockHistory(req, res, next) {
    try {
      const { id: userId } = req.user
      const result = await this.getStockHistoryUseCase.execute(userId)

      return res.json(result);

    } catch (error) {
      next(error)
    }
  }
}

export default StockController;
