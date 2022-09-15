const { verifyToken } = require("../helpers/jwt");
const { User} = require("../models");
async function auth (req, res, next) {
    try {
      let acces_token = req.headers.acces_token;
      if (!acces_token) {
        next({name : "Unauthorized"})
      } else {
        let payload = verifyToken(acces_token);
        let user = await User.findByPk(payload.id);
        if (!user) {
          next({name : "Unauthorized"})
        } else {
          req.user = {
            id: user.id,
            email : user.email
          };
          next();
        }
      }
    } catch (error) {
      if (error.name == "JsonWebTokenError") {
        next({name : "JsonWebTokenError"})
      }
    }
  }

module.exports = auth