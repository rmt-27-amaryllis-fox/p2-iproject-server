const { Bookmark, Favorite, User } = require('../models')
const { comparePassword, generateToken, verifyToken } = require('../helper/helper')


class UserClass {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      const data = await User.create({ username, email, password })
      res.status(201).json({
        id: data.id,
        email: data.email
      })
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      let data = await User.findOne({ where: { email } })
      if (!data) {
        throw { name: "invalidEmailPassword"}
      }
      
      let validationPassword = comparePassword(password, data.password)
      if (!validationPassword) {
        throw { name: "invalidEmailPassword"}
      }
      
      const payload = { id: data.id }
      const access_token = generateToken(payload)

      res.status(200).json({ access_token })
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async bookmark(req, res, next) {
    try {
      const data = await Bookmark.findAll({ include: [ User ] })
      
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { rightHand, leftHand, helmet, chestArmor, gauntlet, legArmor, talisman1, talisman2, talisman3, talisman4 } = req.body
      const { id } = req.user
      const data = await Bookmark.create({
        rightHand, 
        leftHand,
        helmet,
        chestArmor,
        gauntlet,
        legArmor,
        talisman1,
        talisman2,
        talisman3,
        talisman4,
        UserId: id
      })
      
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = UserClass