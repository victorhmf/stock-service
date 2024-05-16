// import axios from 'axios'

class StockApiService {
  async fetchData(stockCode) {
    console.log(stockCode)

    // const response = await axios.get('http://stock-service/stock');
      // return response.data;

    return {
      name: "APPLE",
      symbol: "AAPL.US",
      open: 123.66,
      high: 123.66,
      low: 122.49,
      close: 123
    }
  }
}

export default StockApiService