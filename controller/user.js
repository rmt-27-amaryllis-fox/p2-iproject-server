const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const {User} = require('../models')

class userController {
    static async register(req,res,next) {
        let body = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        }
        try {
            const createdUser = await User.create(body)
            res.status(201).json({message: `User with email ${createdUser.email} has been created`})
        } catch (err) {
            next(err)
        }
    }

    static async login(req,res,next) {
        try {
            const {email,password} = req.body
            const user = await User.findOne({ where: {email} })
            if(!user) {
                throw {name: 'invalid email/password'}
            }
            const passwordValidation = comparePassword(password, user.password)
            if(!passwordValidation) {
                throw {name: 'invalid email/password'}
            }
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            }
            const token = createToken(payload)
            const role = user.role
            const username = user.username
            res.status(200).json({token,role,username})
        } catch (err) {
            next(err)    
        }
    }
}


module.exports = userController