const {User} = require('../models')
const {matchPassword} = require('../helper/brypt')
const {getToken, verifyToken} = require('../helper/jwt')

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(401).json({ message: "Invalid email/password" });
      }

      const isTrue = matchPassword(password, user.password)
      if (!isTrue) {
        return res.status(401).json({ message: "Invalid email/password" });
      }

      const payload = {
        id: user.id,
      };
      const access_token = getToken(payload)
      res.status(200).json({ access_token });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      let user = await User.create({ email, password, role: "customer" });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      if (
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = Controller;
