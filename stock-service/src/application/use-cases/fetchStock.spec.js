import FetchStock from './fetchStock';
import FetchStockDTO from '../dtos/fetchStockDto'; 

describe('FetchStock', () => {
  const mockStockApiService = {
    fetchData: jest.fn(),
  };
  
  const mockCsvToJsonParserService = {
    parse: jest.fn(),
  };
  
  const fetchStock = new FetchStock({
    stockApiService: mockStockApiService,
    csvToJsonParserService: mockCsvToJsonParserService,
  });

  describe('#execute', () => {
    describe('on success', () => {
      it('should fetch and parse stock data successfully', async () => {
        const stockCode = 'AAPL';
        const mockResponse = 'Date,Open,High,Low,Close\n2024-05-17,126.82,127.53,125.94,127.35\n';
        const mockParsedData = {};

        mockStockApiService.fetchData.mockResolvedValueOnce(mockResponse);
        mockCsvToJsonParserService.parse.mockResolvedValueOnce(mockParsedData);

        const result = await fetchStock.execute(stockCode);

        expect(result).toBeInstanceOf(FetchStockDTO);
      });

      it('should return an empty object if response is not valid', async () => {
        const stockCode = 'AAPL';
        const mockResponse = 'Date,Open,High,Low,Close\nN/D,N/D,N/D,N/D,N/D\n';

        mockStockApiService.fetchData.mockResolvedValueOnce(mockResponse);

        const result = await fetchStock.execute(stockCode);

        expect(result).toEqual({});
      });
    });

    describe('on fail', () => {
      describe('when fetching stock data', () => {
        it('should handle exception from stockApiService.fetchData', async () => {
          const stockCode = 'AAPL';
          const errorMessage = 'Error fetching data';

          mockStockApiService.fetchData.mockRejectedValueOnce(new Error(errorMessage));

          await expect(fetchStock.execute(stockCode)).rejects.toThrow(errorMessage);
        });
      });

      describe('when parsing stock data', () => {
        it('should handle exception from csvToJsonParserService.parse', async () => {
          const stockCode = 'AAPL';
          const mockResponse = 'Date,Open,High,Low,Close\n2024-05-17,126.82,127.53,125.94,127.35\n';
          const errorMessage = 'Error parsing data';

          mockStockApiService.fetchData.mockResolvedValueOnce(mockResponse);
          mockCsvToJsonParserService.parse.mockRejectedValueOnce(new Error(errorMessage));

          await expect(fetchStock.execute(stockCode)).rejects.toThrow(errorMessage);
        });
      });
    });
  });
});
