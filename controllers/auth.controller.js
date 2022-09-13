const {User} = require('../models')

class AuthController {
  static async register(req, res, next) {
    try {
      const {name, email, password} = req.body;
      const user = await User.create({name, email, password});
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        premium: user.premium
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthController;