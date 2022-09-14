const { User } = require("../models");
const {compareHash} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;
      if(!email) throw {name: "Email is required"}
      if(!password) throw {name: "Password is required"}

      const newUser = await User.create({ email, password, phoneNumber, address })

      res.status(201).json({id: newUser.id, email: newUser.email})
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body
      if(!email) throw {name: "Email is required"}
      if(!password) throw {name: "Password is required"}

      const user = await User.findOne({where: {email}})
      if(!user) throw {name: "Invalid email/password"}

      const compared = compareHash(password, user.password)
      if(!compared) throw {name: "Invalid email/password"}

      const payload = {id: user.id}
      const access_token = createToken(payload)

      res.status(200).json({access_token})
    } catch (error) {
      next(error)
    }
  }

  static async paid(req, res, next) {
    try {
      const paid = true
      const {id} = req.user
      const paidUpdate = await User.update({paid}, {where: {id}})
      res.status(200).json({message: "success update paid status"})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
