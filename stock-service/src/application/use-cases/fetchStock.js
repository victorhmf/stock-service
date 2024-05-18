import FetchStockDTO from "../dtos/fetchStockDto.js";

class FetchStock {
  constructor({ stockApiService, csvToJsonParserService }) {
    this.stockApiService = stockApiService;
    this.csvToJsonParserService = csvToJsonParserService
  }

  async execute(stockCode) {
    const response = await this.stockApiService.fetchData(stockCode);
    if(!this.#responseValid(response)) return {}

    const jsonResponse = await this.csvToJsonParserService.parse(response)
    const stock = new FetchStockDTO(jsonResponse)

    return stock;
  }

  #responseValid(response) {
    return response && !response.includes("N/D")
  }
}

export default FetchStock;
