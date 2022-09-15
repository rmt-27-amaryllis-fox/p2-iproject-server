const {User} = require('../models');

class UserController {
  static async show(req, res, next) {
    try{
      const {id} = req.user;
      const user = await User.findByPk(id);
      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        premium: user.premium
      });
    }catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;