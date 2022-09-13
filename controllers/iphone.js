const {User, Bookmark, iphone} = require('../models')

class Iphone {
    static async iphone (req, res, next) {
        try {
            let phone = await iPhone.findAll()
            res.status(200).json(phone)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async myOrder (req, res, next) {
        try {
            let order = await Bookmark.findAll()
            res.status(200).json(order)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = Iphone