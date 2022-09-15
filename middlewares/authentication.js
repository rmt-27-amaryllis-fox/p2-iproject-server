const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = async (req, res, next) => {
  try {
    const {access_token} = req.headers
    if(!access_token) throw {name: "Invalid token"}
    
    const payload = verifyToken(access_token)
    const user = await User.findByPk(payload.id)
    if(!user) throw {name: "Invalid token"}

    req.user = {id: user.id, email: user.email}
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication