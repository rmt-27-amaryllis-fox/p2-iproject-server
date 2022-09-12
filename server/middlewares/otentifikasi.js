const { verifyToken } = require("../helper/jwt");

async function otentifikasi(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      res.status(401).json({ message: `Invalid token` });
    }

    let payload = verifyToken(access_token);
    req.user = {
      id: payload.id,
    };
    console.log(payload, "payload");
    next();
  } catch (error) {
    console.log(error, "otenti");
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: `Invalid token` });
    }
  }
}

module.exports = otentifikasi;
