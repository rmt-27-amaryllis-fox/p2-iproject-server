const {verified} = require("./jwt")
const {Customer} = require('../models')

async function authentification(req, res, next){

    try {
        let access_token = req.headers.access_token
        if(!access_token){
            throw { name: 'Unautorized'}
        } else {
            let payload = verified(access_token)
            if(!payload.email){
                throw{name: 'not a Customer'}
            }
            let user = await Customer.findOne({where: {
                id: payload.id,
                email: payload.email
            }})
            if (!user) {
                throw {name: 'Unautorized'}
            } else {
                req.user = {
                    id: user.id,
                    name: user.username,
                    role: 'customer'
                }
                next()
            }
        }
    } catch (error) {
        next(error)
    }
    
}

module.exports = authentification