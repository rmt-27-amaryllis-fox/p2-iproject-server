const { User, UserProfile, CardDatabase } = require('../models')
const { comparePassword } = require('../helpers/bcrypt-password')
const { createToken } = require('../helpers/json-web-token')
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
    //? Ini bisa semua role login
    try {
      // dapatkan data dari body
      let bodyLogin = {
        email: req.body.email,
        password: req.body.password
      }

      if (!bodyLogin.email || !bodyLogin.password) {
        throw {
          name: `invalid email/password`
        }
      }

      // cari by email
      let findUser = await User.findOne({ where: { email: bodyLogin.email } })
      // console.log(findUser, `<<<< masuk`)
      // kalo gaada
      if (!findUser) {
        throw {
          name: `invalid email/password`
        }
      }
      // compare password 
      // console.log(findUser.password, `<<< ini pas`)
      const passwordValidation = comparePassword(bodyLogin.password, findUser.password)
      // console.log(passwordValidation, `<<<< ini hasil bandingin password`)
      if (!passwordValidation) {
        throw {
          name: `invalid email/password`
        }
      }
      // bikin token nya
      let usernameFind = findUser.username
      const payload = {
        id: findUser.id,
        username: findUser.username
      }
      const access_token = createToken(payload)
      res.status(200).json({ access_token, usernameFind })


    } catch (error) {
      next(error)
    }
  }

  static async showUserProfile(req, res, next) {
    try {
      console.log(`masok ke method showuserprofile`)
      let UserId = req.userLogged.id
      console.log(`dapat user id nya yang auth  : ${UserId}`)
      let userProfileData = await User.findOne({
        where: {
          id: UserId
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password']
        },
        include: [
          {
            model: UserProfile,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
          },
          {
            model: CardDatabase,
            attributes: ['cardName', 'cardType', ['imageUrl', 'image_url'], ['imageUrlShort', 'image_url_small']],
              // exclude: ['createdAt', 'updatedAt']
            order: [['createdAt', 'DESC']],
            limit: 3
          }
        ]

      });
      console.log(userProfileData)
      res.status(200).json(userProfileData)


    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}


module.exports = UserController