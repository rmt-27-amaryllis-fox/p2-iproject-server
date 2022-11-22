const {Address} = require('../models')

class addressController{
    static async getAddress(req,res,next){
        try {
            const id = req.user.id
            const data = await Address.findAll({
                where: {UserId:id}
            })
            res.status(200).json(data)
        } catch (err) {
            next()
        }
    }

    static async createAddress(req,res,next) {
        try {
            let body = {
                name: req.body.name,
                street: req.body.street,
                city: req.body.city,
                UserId: req.user.id
            }
            const address = await Address.create(body)
            res.status(201).json({name:address.name, street:address.street, city:address.city, UserId:address.UserId})
        } catch (err) {
            next()
        }
    }
}

module.exports = addressController