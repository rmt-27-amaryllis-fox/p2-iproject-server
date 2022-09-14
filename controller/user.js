const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mailjet = require("node-mailjet");
const mailjet = require("../mailjet-project/mailjet");

class userController {
  static async register(req, res) {
    try {
      const mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC,
        apiSecret: process.env.MJ_APIKEY_PRIVATE,
      });
      let { email, password, username } = req.body;
      let data = await User.create({
        email,
        password,
        username,
        role: "Admin",
      });
      let request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "nurmizwari04@gmail.com",
              Name: "nur",
            },
            To: [
              {
                Email: req.body.email,
                Name: req.body.username,
              },
            ],
            Subject: "(DEMO) From Laksana baru swalayan.",
            TextPart: "Welcome",
            HTMLPart: "<h3>Welcome! utamakan 4S salam sapa senyum dan santun",
            CustomID: "AppGettingStartedTest",
          },
        ],
      });
      request
        .then((result) => {
          console.log(result.body);
        })
        .catch((err) => {
          console.log(err.statusCode);
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
