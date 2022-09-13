const { User, UserProfile } = require('../models')

class UserController {
  static async registerMethod(req, res, next) {

    try {
      // username coba2 : ini_coba_har_1
      // email coba2 : za_admin_har1@yunikuro.com
      // password coba2 : passwordhardaya1
      let bodyUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }

      let createdUser = await User.create(
        bodyUser
      )

      let createdUserProfile = await UserProfile.create({
        name: createdUser.username,
        bio: 'This is a normal Bio',
        UserId: createdUser.id,
        totalSpellCard: 0,
        totalTrapCard: 0,
        totalMonsterCard: 0,
        totalWin: 0,
        totalLose: 0,
      })


      res.status(201).json({ message: `user with email ${createdUser.email} has been created` })

    } catch (error) {
      next(error)
    }
  }

  static async loginMethod(req, res, next) {

  }
}


module.exports = UserController