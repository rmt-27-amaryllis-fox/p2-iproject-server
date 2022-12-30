const {User} = require('../models')
const {validatePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try { 
            let {email, password, username} = req.body
            if(!email){
                throw {name : 'email_req'}
            }

            if(!password){
                throw {name : 'password_req'}
            }

            let createdUser = await User.create({
                email : email,
                password : password, 
                username : username
            })

            res.status(201).json({
                message : "Success created new user with id " + createdUser.id,
                data : {
                    id : createdUser.id,
                    email : createdUser.email,
                    username : createdUser.username
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let {email, password} = req.body
            let findUser = await User.findOne({
                where : {email}
            })

            if(!findUser){
                throw {name : 'invalid_email/password'}
            }

            let passwordValidation = validatePassword(password, findUser.password)

            if(!passwordValidation){
                throw {name : 'invalid_email/password'}
            }

            let payload = {
                id : findUser.id
            }

            let access_token = generateToken(payload)

            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController