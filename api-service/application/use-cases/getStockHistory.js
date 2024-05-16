class GetStockHistory {
  constructor(stockRepository) {
    this.stockRepository = stockRepository
  }

  async execute(userId) {
    const history = await this.stockRepository.findMany({ userId, orderBy: { createdAt: 'desc' } })

    return history
  }

}

export default GetStockHistory