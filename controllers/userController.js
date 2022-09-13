const { User } = require("../models");

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
}

module.exports = Controller;
