class GetStockHistoryDTO {
  constructor({
    createdAt, name, symbol, open, high, low, close
  }) {
    this.date = createdAt
    this.name = name
    this.symbol = symbol
    this.open = open
    this.high = high
    this.low = low
    this.close = close
  }
}

export default GetStockHistoryDTO