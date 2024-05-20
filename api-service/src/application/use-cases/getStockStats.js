class GetStockStats {
  constructor(stockRepository) {
    this.stockRepository = stockRepository
  }

  async execute() {
    const stats = await this.stockRepository.countRequestsBySymbol()

    return stats
  }

}

export default GetStockStats