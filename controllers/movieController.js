require("dotenv").config();
const axios = require("axios");
const baseUrl = "https://api.themoviedb.org/3";

class Controller {
  static async movies(req, res, next) {
    try {
      let { page = 1 } = req.params;
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/movie/popular",
        params: {
          api_key: process.env.TMDB_API_KEY,
          page,
        },
      });
      res.status(200).json(data)
      console.log(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
