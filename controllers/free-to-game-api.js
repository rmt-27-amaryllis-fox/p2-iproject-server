const axios = require("axios");

class Controller {
  static async gameList(req, res) {
    let { sortby, platform, category, id } = req.query;

    if (sortby == "") sortby = undefined;

    if (platform == "") platform = undefined;

    if (category == "") category = undefined;

    // if (!platform) {
    //   platform = "all";
    // }

    let config = {
      method: "get",
      url: "https://www.freetogame.com/api/games",
      params: { "sort-by": sortby, platform, category },
      headers: {
        Cookie: "FREETOGAME=a72058666655c8e8afa5b193cff2d0d9",
      },
    };

    if (id > 0) {
      config.url = "https://www.freetogame.com/api/game",
      config.params = { id };
    }

    try {

      console.log(config)

      const { data } = await axios(config);

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async gameByPlatform(req, res) {
    const { platform } = req.query;
    const config = {
      method: "get",
      url: "https://www.freetogame.com/api/games",
      params: { platform: platform },
    };
    try {
      const { data } = await axios(config);

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async gameByCategory(req, res) {
    const { category } = req.query;
    const config = {
      method: "get",
      url: "https://www.freetogame.com/api/games",
      params: { category },
      headers: {
        Cookie: "FREETOGAME=a72058666655c8e8afa5b193cff2d0d9",
      },
    };

    try {
      const { data } = await axios(config);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async sortBy(req, res) {
    const { sortby } = req.query;
    const config = {
      method: "get",
      url: "https://www.freetogame.com/api/games",
      params: { "sort-by": sortby },
      headers: {
        Cookie: "FREETOGAME=a72058666655c8e8afa5b193cff2d0d9",
      },
    };

    try {
      const { data } = await axios(config);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async sortAll(req, res) {
    const { sortby, platform, category } = req.query;
    const config = {
      method: "get",
      url: "https://www.freetogame.com/api/games",
      params: { "sort-by": sortby, platform, category },
      headers: {
        Cookie: "FREETOGAME=a72058666655c8e8afa5b193cff2d0d9",
      },
    };

    try {
      const { data } = await axios(config);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
