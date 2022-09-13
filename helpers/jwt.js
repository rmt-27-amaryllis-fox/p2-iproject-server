const jwt = require("jsonwebtoken");
const jwt_key = `abc5dasar`;

const createToken = (payload) => jwt.sign(payload, jwt_key);
const verifyToken = (token) => jwt.verify(token, jwt_key);

module.exports = {
  createToken,
  verifyToken,
};
