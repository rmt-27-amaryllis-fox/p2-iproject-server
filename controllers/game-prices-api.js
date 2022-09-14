const axios = require("axios");

class Controller {
  static async searchGame(req, res) {
    const { name, page } = req.query;
    const limit = 9;
    const offset = (page - 1) * limit;
    const api_key = process.env.secret_api_key
    const config = {
      method: "GET",
      url: "https://game-prices.p.rapidapi.com/games",
      params: { title: name, region: "us", offset: offset, limit: limit },
      headers: {
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": "game-prices.p.rapidapi.com",
      },
    };

    try {
      const { data } = await axios(config);
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
