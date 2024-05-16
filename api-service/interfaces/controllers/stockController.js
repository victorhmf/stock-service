class StockController {
  constructor(fetchAndSaveStockUseCase) {
    this.fetchAndSaveStockUseCase = fetchAndSaveStockUseCase
  }

  async getStock(req, res, next) {
    try {
      const { id: userId } = req.user
      const { q: stockCode } = req.query
      const result = await this.fetchAndSaveStockUseCase.execute({userId, stockCode})

      return res.json(result);
    } catch (error) {
      next(error)
    }
  }
}

export default StockController;
