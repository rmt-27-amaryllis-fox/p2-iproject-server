const axios = require("axios");

class Controller {
  static async searchGame(req, res) {
    const { name } = req.query;

    const config = {
      method: "GET",
      url: "https://game-prices.p.rapidapi.com/games",
      params: { title: name, region: "us", offset: "0", limit: "10" },
      headers: {
        "X-RapidAPI-Key": "fcba7a74dfmsh9f022a8ae32b8aap1aa331jsndc31441189c9",
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
