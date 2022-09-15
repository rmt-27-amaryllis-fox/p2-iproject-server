const {sign, verify} = require('jsonwebtoken');

const createToken = payload => sign(payload, process.env.JWT_TOKEN);
const verifyToken = token => verify(token, process.env.JWT_TOKEN);

module.exports = {createToken, verifyToken}
