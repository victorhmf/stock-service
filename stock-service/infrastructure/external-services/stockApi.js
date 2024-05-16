import axios from 'axios'

class StockApiService {
  async fetchData(stockCode) {
    if (!stockCode) return ''
    const response = await axios.get(`${process.env.STOCK_API_ENDPOINT}?s=${stockCode}&f=sd2t2ohlcvn&h&e=csv`);
    
    return response.data;
  }
}

export default StockApiService