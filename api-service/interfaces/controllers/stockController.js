class StockController {
  constructor({ fetchAndSaveStockUseCase, getStockHistoryUseCase, getStockStatsUseCase }) {
    this.fetchAndSaveStockUseCase = fetchAndSaveStockUseCase
    this.getStockHistoryUseCase = getStockHistoryUseCase
    this.getStockStatsUseCase = getStockStatsUseCase
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

  async getStockStats(req, res, next) {
    try {
      const result = await this.getStockStatsUseCase.execute()

      return res.json(result);
    } catch (error) {
      next(error)
    }
  }
}

export default StockController;
