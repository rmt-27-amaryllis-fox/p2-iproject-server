const {User} = require('../models')
const {createToken} = require('../helpers/jwt');
const {compareSync} = require('bcryptjs');

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

  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      if (!email) throw {name: 'CustomValidationError', message: 'email is required'}
      if (!password) throw {name: 'CustomValidationError', message: 'password is required'}

      const user = await User.findOne({where: {email}});
      if (!user) throw {name: 'CustomValidationError', message: 'invalid email or password'}

      const verifyPassword = compareSync(password, user.password);
      if (!verifyPassword) throw {name: 'CustomValidationError', message: 'invalid email or password'};

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        premium: user.premium
      }

      const access_token = createToken(payload);
      res.status(200).json({
        name: user.name,
        premium: user.premium,
        access_token
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthController;