const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authc = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: `unauthorized` };
    } else {
      const payload = verifyToken(access_token);
      const user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: `unauthorized` };
      } else {
        req.user = {
          id: user.id,
          role: user.role,
          email: user.email,
        };
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authc;
