const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

// errors
const listErrrors = (error) => {
  return error.errors.map(el => el.message);
}

// bcrypt
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 5)
}

const comparePassword = (password, encodedPassword) => {
  return bcrypt.compareSync(password, encodedPassword)
}


//jwt
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey)
}

const verifyToken = (token) => {
  return jwt.verify(token, secretKey)
}

module.exports = { 
  listErrrors,
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken
}