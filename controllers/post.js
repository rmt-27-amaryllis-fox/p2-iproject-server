const { User, Post } = require("../models");

class PostController {
  static async add(req, res, next) {
    try {
      const data = {
        imageUrl: req.body.imageUrl,
        caption: req.body.caption,
        weatherMain: req.body.weatherMain,
        weatherDescription: req.body.weatherDescription,
        weatherIcon: req.body.weatherIcon,
        country: req.body.country,
        location: req.body.location,
        UserId: +req.user.id,
      };

      await Post.create(data);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PostController;
