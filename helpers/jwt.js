const jwt = require('jsonwebtoken')
const SECRET_CODE = process.env.SECRET_CODE

function generateToken(payload){
    return jwt.sign(payload, SECRET_CODE)
}

function verifyToken(token){
    return jwt.verify(token, SECRET_CODE)
}

module.exports = {generateToken, verifyToken}