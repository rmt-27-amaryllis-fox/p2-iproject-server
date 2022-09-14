const {verifyToken} = require('../helpers/jwt');

const authHandler = (req, res, next) => {
  try {
    const {access_token} = req.headers;
    if (!access_token) throw {name: 'Unauthorized'};
    const decodedToken = verifyToken(access_token);
    req.user = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      premium: decodedToken.premium
    };
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = authHandler;