const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

async function auth(req, res, next) {
    try {
      let { token } = req.headers;
      if (!token) throw { name: "Unauthorized" };
      let payload = verifyToken(token)
      let user = await User.findByPk(payload.id);
      if (!user) throw { name: "Unauthorized" };
      req.user = { id: user.id };
      next();
    } catch (err) {
      if (err.name == "JsonWebTokenError") {
        res.status(401).json({ message: "Invalid token" });
      } else if (err.name == "Unauthorized") {
        res.status(401).json({ message: "Invalid token" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  module.exports = auth