//! AUTHENTICATION MIDDLEWARE
const { User } = require("../models");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    console.log(req.headers);
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "please login first" };
      //   res.status(401).json({ message: "please login first" });
    } else {
      let rahasia = process.env.JWT_TOKEN;
      let payload = jwt.verify(access_token, rahasia);
      let user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: "Unautorized" };
        // res.status(401).json({ message: "Unautorized" });
      } else {
        req.user = {
          //! NAMANYA BEBAS
          id: user.id, //! KITA TAU SIAPA  YANG MASUK LEWAT SINI
          role: user.role,
          email: user.email,
        };
        next();
      }
      // console.log(user);
      // console.log(payload, "<<");
      // console.log(access_token);
    }
  } catch (error) {
    // next(error);
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "invalid token" });
    } else if (error.name == "Unautorized") {
      res.status(401).json({ message: "Unautorized" });
    } else if (error.name == "please login first") {
      res.status(401).json({ message: "please login first" });
    }
  }
}

module.exports = auth;
