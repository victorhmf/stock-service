class FetchStockDTO {
  constructor({
    Name, Symbol, Open, High, Low, Close
  }) {
    this.name = Name
    this.symbol = Symbol
    this.open = Number(Open)
    this.high = Number(High)
    this.low = Number(Low)
    this.close = Number(Close)
  }
}

export default FetchStockDTO