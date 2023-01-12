const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authc = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        const checkToken = verifyToken(access_token);
        const user = await User.findByPk(checkToken.id);
        if (!user) throw { name: "Unauthorized" };
        req.user = { id: user.id };
        next()
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authc,
};
