const {Medicine} = require('../models')

class medicineController {
    static async getMedicine(req,res,next) {
        try {
            const data = await Medicine.findAll()
            res.status(200).json(data)
        } catch (err) {
            next()
        }
    }

    static async getMedicineById(req,res,next) {
        try {
            const data = await Medicine.findByPk(req.params.id)
            res.status(200).json(data)
        } catch (err) {
            next()
        }
    }
}

module.exports = medicineController