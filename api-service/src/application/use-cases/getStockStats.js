import GetStockStatsDTO from "../dtos/getStockStatsDto.js"

class GetStockStats {
  constructor(stockRepository) {
    this.stockRepository = stockRepository
  }

  async execute() {
    const stats = await this.stockRepository.countRequestsBySymbol()
    const parsedStats = stats.map(item => new GetStockStatsDTO(item))

    return parsedStats
  }

}

export default GetStockStats