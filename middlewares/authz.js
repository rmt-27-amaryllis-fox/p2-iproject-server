const { Post, User } = require("../models");

async function postAuthz(req, res, next) {
  try {
    const postId = +req.params.id;
    const userId = +req.user.id;

    const post = await Post.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw { name: "Post not found" };
    } else if (userId != post.UserId) {
      throw { name: "Forbidden" };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function userAuthz(req, res, next) {
  try {
    const userId = req.user.id;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw { name: "User not found" };
    } else if (user.id != userId) {
      throw { name: "Forbidden" };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { postAuthz, userAuthz };
