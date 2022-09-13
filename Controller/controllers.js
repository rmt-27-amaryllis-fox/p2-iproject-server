const axios = require("axios");

class ControllerData {
  static async getTweet(req, res) {
    try {
      let { data } = await axios({
        method: "get",
        url: `https://api.twitter.com/2/tweets/1562738189504507904`,
        headers: {
          Authorization:
            "BEARER AAAAAAAAAAAAAAAAAAAAAA8BhAEAAAAACUkg5r%2Fqw1pym%2FJL68cwN%2BO6s8Y%3DnXDXjw8H0QOktxFupa1CcsVLSXNfxVi5yE1VP5Krihb8DL5gkg",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  }
}

module.exports = ControllerData;
