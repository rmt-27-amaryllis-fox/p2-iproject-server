const jwt = require("jsonwebtoken");

function createToken(params) {
  return jwt.sign(params, "rahasia");
}

function verifyToken(params) {
  return jwt.verify(params, "rahasia");
}

module.exports = { createToken, verifyToken };
