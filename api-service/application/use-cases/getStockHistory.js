import GetStockHistoryDTO from "../dtos/getStockHistoryDto.js"

class GetStockHistory {
  constructor(stockRepository) {
    this.stockRepository = stockRepository
  }

  async execute(userId) {
    const history = await this.stockRepository.findMany({ userId, orderBy: { createdAt: 'desc' } })
    const parsedHistory = history.map(item => new GetStockHistoryDTO(item))

    return parsedHistory
  }

}

export default GetStockHistory