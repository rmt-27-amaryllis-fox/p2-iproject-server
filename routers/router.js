const route = require('express').Router()
const {User} = require('../models')
const Customer = require('../controllers/user')
const iPhone = require('../controllers/iphone')
const {getToken, verifyToken} = require('../helper/jwt')

route.post('/login', Customer.login)
route.post('/google-sign-in', Customer.googleSignIn)
route.post('/register', Customer.register)
route.get('/iPhone', iPhone.iphone)

async function authentication (req, res, next) {
    try {
        let accessToken = req.headers.access_token
        if (!accessToken) {
            res.status(401).json({message: "Invalid token"})
        }
    
        const payload = verifyToken(accessToken)
        let user = await User.findOne({where: {id: payload.id}})
        if (!user) {
            res.status(401).json({message: "Invalid token"})
        }
    
        req.user = {id: user.id}
        next()
    } catch (error) {
        console.log(error)
    }
}
route.use(authentication)
route.get('/order', iPhone.myOrder)
route.post('/order/:iphoneId', iPhone.addOrder)
route.delete('/order/:orderId', iPhone.deleteOrder)

module.exports = route