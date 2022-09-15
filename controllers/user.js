const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let check = await User.findOne({
        where : {
          email : email
        }
      })
      if(check){
        return res.status(400).json({
          message : "Email already exist"
        })
      }
      let regist = await User.create({
        username,
        email,
        password,
      });

      res
        .status(201)
        .json({ message: `succesful!! created ${regist.username}` });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        next({ name: "SequelizeError", message: error.errors[0].message });
      } else {
        next({});
      }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "Invalid email or password" };
      }
      const compare = comparePassword(password, findUser.password);
      if (!compare) {
        throw { name: "Invalid email or password" };
      }
      const payload = {
        id: findUser.id,
        role: findUser.role,
      };
      const acces_token = createToken(payload);

      res.status(200).json({
        acces_token: acces_token,
        user: {
          id: findUser.id,
          username: findUser.username,
          role: findUser.role,
        },
      });
    } catch (error) {
      if (error.name == "Invalid email or password")
        next({ name: "Invalid email or password" });
      else {
        next({});
      }
    }
  }
}
module.exports = Controller;
