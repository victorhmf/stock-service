import axios from 'axios'

class StockApiService {
  async fetchData(stockCode) {
    if (!stockCode) return ''
    const response = await axios.get(`https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcvn&h&e=csv`);
    
    return response.data;
  }
}

export default StockApiService