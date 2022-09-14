const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

async function authentication(req, res, next){
    try {
        let {access_token} = req.headers

        if(!access_token){
            throw {name : 'unauthorized'}
        }

        let payload =  verifyToken(access_token)

        let findUser = await User.findByPk(payload.id)

        if(!findUser){
            throw {name : 'unauthorized'}
        }

        req.user = {
            id : findUser.id
        }

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = authentication