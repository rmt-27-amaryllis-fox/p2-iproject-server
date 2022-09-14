const jwt = require("jsonwebtoken");
const key = process.env.secret_key;
const createToken = (payload) => jwt.sign(payload, key);
const verifyToken = (token) => jwt.verify(token, key);

module.exports = {
  createToken,
  verifyToken,
};
