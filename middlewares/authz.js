const { Post } = require("../models");

async function authz(req, res, next) {
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

module.exports = authz;
