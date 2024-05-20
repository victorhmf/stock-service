import axios from 'axios'

class StockApiService {
  async fetchData(stockCode) {
    const response = await axios.get(`${process.env.STOCK_API_ENDPOINT}?q=${stockCode}`);
    
    return response.data;
  }
}

export default StockApiService