const axios = require('axios');

class TickerControllers {
  static async show(req, res, next) {
    try{
      const {ticker} = req.query;
      if(!ticker) throw {name: 'CustomValidationError', message: 'Ticker Not Found!'};
      const {data: {results: tickerDetailInfo}} = await axios.get(`https://api.polygon.io/v3/reference/tickers/${ticker.toUpperCase()}`, {
        params: {
          apiKey: process.env.STOCK_KEY
        }
      });

      const {data: {results : [tickerFinancialInfo]}} = await axios.get(`https://api.polygon.io/vX/reference/financials`, {
        params: {
          ticker: ticker.toUpperCase(),
          apiKey: process.env.STOCK_KEY
        }
      })

      res.status(200).json({
        tickerFinancialInfo,
        tickerDetailInfo
      });
    }catch (e) {
      next(e);
    }
  }
}

module.exports = TickerControllers;