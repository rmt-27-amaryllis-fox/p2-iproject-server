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
  static async getPhotos(req, res) {
    try {
      let { data } = await axios({
        method: `GET`,
        url: `https://pexelsdimasv1.p.rapidapi.com/v1/search`,
        headers: {
          Authorization:
            "563492ad6f91700001000001744da872d906440b8ad505083c47c085",
          "X-RapidAPI-Key":
            "b7f1996633mshe3ca22193071876p1b726djsne395f27b6f43",
          "X-RapidAPI-Host": "PexelsdimasV1.p.rapidapi.com",
        },
        params: { query: "concert", locale: "id-ID", per_page: "5", page: "1" },
      });
      // isi query concert
      let photos = data.photos.map((el) => el.url);

      photos = photos.map((el) => el.slice(-8, -1));
      photos = photos.map((el) => {
        return `https://images.pexels.com/photos/${el}/pexels-photo-${el}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
      });
      delete photos[2];
      photos = photos.filter((el) => el !== null);
      // console.log();
      //photo ini yg dikembalikan
      res.status(200).json({ data: photos });
    } catch (error) {
      if ((error.message = "Request failed with status code 400")) {
        res.status(400).json({ message: "data not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = ControllerData;
