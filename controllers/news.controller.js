const axios = require('axios');

class NewsController {
  static async index(req, res) {
    try{
      const {data} = await axios.get('https://api.marketaux.com/v1/news/all', {
        params: {
          api_token: process.env.NEWS_API,
          language: 'en'
        }
      });
      res.status(200).send(data);
    }catch (e) {
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  }
}

module.exports = NewsController;