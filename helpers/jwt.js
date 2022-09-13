const jwt = require("jsonwebtoken");
const jwtSecret = "hihuhihu";

const signToken = (payload) => jwt.sign(payload, jwtSecret);
const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = { signToken, verifyToken };
