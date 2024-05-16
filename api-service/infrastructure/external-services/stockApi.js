import axios from 'axios'

class StockApiService {
  async fetchData(stockCode) {
    const response = await axios.get(`http://stock-service:3002/stock?q=${stockCode}`);
    
    return response.data;
  }
}

export default StockApiService