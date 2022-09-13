const {Characteristic, Customer, Order, OrderItem, Plan, PlanItem, Product, Recommendation } = require('../models')
const { comparing } = require('../helper/bcrypt')
const { createToken } = require('../helper/jwt.js')

class AuthController {
    static async register(req, res, next){
        try {
            let body = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            let data = await Customer.create(body)
            res.status(201).json(data)    
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async login (req, res, next) {
        try {
            let body = {
                email: req.body.email,
                password: req.body.password
            }
            // console.log(body);
            const visitor = await Customer.findOne({
                where: {
                    email: body.email
                }
            })
            // console.log(visitor);
            if (!visitor){
                throw {name : 'Invalid email/password'}
            }

            const passwordVal = comparing(body.password, visitor.password)
            if(!passwordVal){
                throw {name : 'Invalid email/password'}
            }
            
            const payload = {
                id: visitor.id,
                email: visitor.email
            }

            const token = createToken(payload)
            res.status(200).json({access_token: token})

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
module.exports = AuthController