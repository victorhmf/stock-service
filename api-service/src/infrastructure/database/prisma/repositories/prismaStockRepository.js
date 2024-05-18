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

  async findMany({userId, orderBy}) {
    const stocks = db.stock.findMany({
      where: {
        userId,
      },
      orderBy
    });

    return stocks
  }

  async countRequestsBySymbol() {
    const result = await db.stock.groupBy({
      by: ['symbol'],
      _count: {
        symbol: true
      },
      orderBy: {
        _count: {
          symbol: 'desc'
        }
      },
      take: 5
    });

    return result;
  }
}

export default PrismaStockRepository;
