const { User, Post } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };

      // Check for empty input
      if (!data.username) {
        throw { name: "Username is required" };
      }
      if (!data.email) {
        throw { name: "Email is required" };
      }
      if (!data.password) {
        throw { name: "Password is required" };
      }

      // Check if username/email already been used
      const emailCheck = await User.findOne({
        where: {
          email: data.email,
        },
      });
      if (emailCheck) throw { name: "Email must be unique" };

      const usernameCheck = await User.findOne({
        where: {
          email: data.email,
        },
      });
      if (usernameCheck) throw { name: "Username must be unique" };

      // Register new user
      await User.create(data);

      // Response
      const findUser = await User.findOne({
        where: {
          email: data.email,
        },
      });

      res.status(201).json({
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
