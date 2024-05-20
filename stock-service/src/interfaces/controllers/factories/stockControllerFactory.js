import StockApiService from "../../../infrastructure/external-services/stockApi.js";
import StockController from "../stockController.js";
import FetchStock from "../../../application/use-cases/fetchStock.js";
import CsvToJsonParserService from "../../services/csvToJsonParser.js";

export const makeStockController = () => {
  const stockApiService = new StockApiService()
  const csvToJsonParserService = new CsvToJsonParserService()
  const fetchStockUseCase = new FetchStock({ stockApiService, csvToJsonParserService })

  return new StockController({ fetchStockUseCase });
}