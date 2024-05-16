class FetchStockDTO {
  constructor({
    Name, Symbol, Open, High, Low, Close
  }) {
    this.name = Name
    this.symbol = Symbol
    this.open = Open
    this.high = High
    this.low = Low
    this.close = Close
  }
}

export default FetchStockDTO