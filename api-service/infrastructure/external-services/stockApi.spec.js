import axios from 'axios';
import StockApiService from './stockApi';

jest.mock('axios');

describe('StockApiService', () => {
  let stockApiService;

  beforeEach(() => {
    stockApiService = new StockApiService();
  });

  describe('fetchData', () => {
    it('should fetch data from the stock API and return response data', async () => {
      const mockResponseData = {};
      axios.get.mockResolvedValueOnce({ data: mockResponseData });

      const stockCode = 'AAPL';
      const result = await stockApiService.fetchData(stockCode);

      expect(axios.get).toHaveBeenCalledWith(`${process.env.STOCK_API_ENDPOINT}?q=${stockCode}`);
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error fetching data';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const stockCode = 'AAPL';

      await expect(stockApiService.fetchData(stockCode)).rejects.toThrow(errorMessage);
    });
  });
});
