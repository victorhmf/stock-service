import StockRepository from "../../../../domain/repositories/stockRepository.js";
import db from "../index.js"

class PrismaStockRepository extends StockRepository {
  async create(stock) {

    const {
      name,
      symbol,
      open,
      high,
      low,
      close,
      userId,
      createdAt,
      updatedAt
    } = stock

    const result = await db.stock.create({
      data: {
        name,
        symbol,
        open,
        high,
        low,
        close,
        userId,
        createdAt,
        updatedAt
      }
    })

    return result
  }
}

export default PrismaStockRepository;
