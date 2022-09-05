const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class userController {
  static async register(req, res) {
    try {
      let { email, password, username } = req.body;
      let data = await User.create({
        email,
        password,
        username,
        role: "Admin",
      });
      res.status(200).json({ email: data.email, username: data.username });
    } catch (error) {
      console.log(error);
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async login(req, res) {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password !" });
      }
      let comparePw = bcrypt.compareSync(password, user.password);
      if (!comparePw) {
        return res.status(401).json({ message: "Invalid email or password !" });
      }
      let payload = {
        id: user.id,
        role: user.role,
      };
      let rahasia = process.env.JWT_TOKEN;
      let access_token = jwt.sign(payload, rahasia);
      console.log(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
module.exports = userController;
