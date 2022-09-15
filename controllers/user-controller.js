const { User, UserProfile, CardDatabase } = require('../models')
const { comparePassword } = require('../helpers/bcrypt-password')
const { createToken } = require('../helpers/json-web-token')
const { OAuth2Client } = require('google-auth-library');


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

  static async signWithGoogleOauth(req, res, next) {
    // console.log(`masuk dari gugel auth bosku`)
    try {
      // console.log(`udah masuk`)
      // terima token dari oauth gugel req header

      let { token_dari_google } = req.headers
      // console.log(req.headers, `ini full req header`)
      // console.log(token_dari_google, `ini coba cari token gogle`)

      // instantiate token tadi
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      // console.log(client, `ini coba cari token gogle`)

      // verifikasi token nya
      const ticket = await client.verifyIdToken({
        idToken: token_dari_google,
        audience: process.env.GOOGLE_CLIENT_ID,
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      // console.log(ticket, `ini coba tiket verify token ggogle`)

      // dapatin user ama emailnya di decode
      const payload = ticket.getPayload();
      // console.log(payload, `ini coba get payload token ggogle`)

      const userid = payload['sub'];
      // If request specified a G Suite domain:
      // const domain = payload['hd'];


      // cari findone
      // kalo ga nemu userm bikin user nya baru generate acces token
      // kalo ada, langsung generate acces token aj

      let [user, created] = await User.findOrCreate({
        where: {
          email: payload.email
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "ini_dari_google",
        },
        hooks: false
      })

      let createdUserProfile = await UserProfile.create({
        name: user.username,
        bio: 'This is a normal Bio',
        UserId: user.id,
        totalSpellCard: 0,
        totalTrapCard: 0,
        totalMonsterCard: 0,
        totalWin: 0,
        totalLose: 0,
      })

      // console.log(user, `<<<ini bikin user`)
      // console.log(created, `<<<ini iscreated`)

      const access_token = createToken({
        id: user.id
      })

      // console.log(access_token, `ini coba masuk acces token`)
      let usernameFind = user.username

      res.status(200).json({ access_token, usernameFind })

    }
    catch (error) {
      // console.log(error, `ini eror dari controller`)
      // res.status(500).json({ message: "Internal Server Error Google" })
      next(error)
    }


  }

}


module.exports = UserController