const axios = require('axios');

class NewsController {
  static async index(req, res) {
    try {
      // const {data} = await axios.get('https://api.marketaux.com/v1/news/all', {
      //   params: {
      //     api_token: process.env.NEWS_API,
      //     language: 'en'
      //   }
      // });
      const {data: {data: {mostPopularEntries: {assets}}}} = await axios.get('https://cnbc.p.rapidapi.com/news/v2/list-trending', {
        params: {
          tag: 'Articles',
          count: 15
        },
        headers: {
          'X-RapidAPI-Key': process.env.CNBC_API_KEY,
          'X-RapidAPI-Host': 'cnbc.p.rapidapi.com'
        }
      });
      res.status(200).send(assets);
    } catch (e) {
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  }
}

module.exports = NewsController;