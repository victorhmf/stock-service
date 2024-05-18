import axios from 'axios';
import StockApiService from './stockApi';

jest.mock('axios');

describe('StockApiService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchData', () => {
    it('should fetch data from the API endpoint and return it', async () => {
      const responseData = 'CSV data';
      axios.get.mockResolvedValueOnce({ data: responseData });

      const stockApiService = new StockApiService();

      const stockCode = 'AAPL';
      const result = await stockApiService.fetchData(stockCode);

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.STOCK_API_ENDPOINT}?s=${stockCode}&f=sd2t2ohlcvn&h&e=csv`
      );
      expect(result).toEqual(responseData);
    });

    it('should return an empty string if stockCode is not provided', async () => {
      const stockApiService = new StockApiService();
      const result = await stockApiService.fetchData('');

      expect(axios.get).not.toHaveBeenCalled();
      expect(result).toEqual('');
    });

    it('should throw an error if fetching data fails', async () => {
      const errorMessage = 'Failed to fetch data';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const stockApiService = new StockApiService();
      const stockCode = 'AAPL';
      
      await expect(stockApiService.fetchData(stockCode)).rejects.toThrow(errorMessage);
    });
  });
});
