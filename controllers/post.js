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

  static async posts(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "profilePicture"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
          order: [["id", "DESC"]],
        },
      });

      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async edit(req, res, next) {
    try {
      const postId = +req.params.id;

      const post = await Post.findByPk(postId);
      if (!post) {
        throw { name: "Post not found" };
      }

      const { imageUrl, caption } = req.body;

      await Post.update(
        { imageUrl, caption },
        {
          where: {
            id: postId,
          },
        }
      );

      res.status(200).json({ message: `Post updated` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PostController;
