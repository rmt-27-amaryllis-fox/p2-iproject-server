const { Bookmark, Favorite, User, Weapon } = require('../models')
const { comparePassword, generateToken, verifyToken } = require('../helper/helper')


class LocalClass {
  static async getWeapon(req, res, next) {
    try {
      const { page } = req.query
      let startingPage = 0
      console.log(req.query)

      if(page > 1) {
        startingPage = (page - 1) * 15
      }

      const data = await Weapon.findAll({
        limit: 15,
        offset: startingPage
      })

      const count = await Weapon.count()
      const response = {
        rows: data,
        totalData: Math.ceil(count/15)
      }
      res.status(200).json(response)
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  
}

module.exports = LocalClass