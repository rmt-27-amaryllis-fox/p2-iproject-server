const {OAuth2Client} = require('google-auth-library');
const { User } = require("../models");
const { matchPassword } = require("../helper/brypt");
const { getToken, verifyToken } = require("../helper/jwt");
const Mailjet = require("node-mailjet");
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "72888c8811f96ab0118f6a7c79b90167",
  apiSecret:
    process.env.MJ_APIKEY_PRIVATE || "91c14a3072d528a80af39d4298bed221",
});

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

      const isTrue = matchPassword(password, user.password);
      if (!isTrue) {
        return res.status(401).json({ message: "Invalid email/password" });
      }

      const payload = {
        id: user.id,
      };
      const access_token = getToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      let user = await User.create({ email, password, role: "customer" });

      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "mauritius.william.wijaya1@gmail.com",
              Name: "William",
            },
            To: [
              {
                Email: email,
              },
            ],
            Subject: "Berhasil Register",
            TextPart: "Selamat, email anda sudah terdaftar di Applu",
            HTMLPart:
              "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
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
  static async googleSignIn(req, res, next) {
    try {
      const { token_dari_google } = req.body;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token_dari_google,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "ini_dari_google",
          role: "customer",
        },
        hooks: false,
      });

      const access_token = getToken({
        id: user.id,
      });

      res.status(200).json([{ access_token }, user]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
