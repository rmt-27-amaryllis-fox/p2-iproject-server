const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { User, Category, History, Service } = require("../models");
const { createToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const {
        email,
        password,
        username,
        role,
        BirthOfDate,
        address,
        phoneNumber,
      } = req.body;
      const body = {
        email,
        password: hashPassword(password),
        username,
        role,
        BirthOfDate,
        address,
        phoneNumber,
      };
      console.log(body);
      const data = await User.create(body);
      res.status(201).json({
        id: data.id,
        email: data.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({
        where: { email },
      });
      if (!findUser) {
        throw { name: `invalid email/password` };
      }
      const checkPassword = comparePassword(password, findUser.password);
      if (!checkPassword) {
        throw { name: `invalid email/password` };
      }
      const payload = {
        id: findUser.id,
      };
      const createdToken = createToken(payload);
      res.status(200).json({
        access_token: createdToken,
        name: findUser.username,
        role: findUser.role,
      });
    } catch (error) {
      next(error);
    }
  }
  static async services(req, res, next) {
    try {
      const body = {
        UserId: req.user.id,
        status: `Booked`,
        ServiceDate: req.body.ServiceDate,
        CategoryId: req.body.CategoryId,
      };
      const data = await Service.create(body);
      await History.create({
        UserId: req.user.id,
        ServiceId: data.id,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async updateStatus(req, res, next) {
    try {
      await Service.update(
        { status: "Done" },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        message: `You're bicycle has done become to awesome`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async queueList(req, res, next) {
    try {
      const data = await Service.findAll({
        where: {
          status: {
            [Op.notILike]: `%done%`,
          },
        },
      });
      // const update = await data.findAll({
      //   where: {
      //     ServiceDate: {
      //       [Op.lt]: new Date(
      //         new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1
      //       ),
      //       [Op.gt]: new Date(startDate),
      //     },
      //   },
      // });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async myHistory(req, res, next) {
    try {
      const data = await Service.findAll({
        where: {
          UserId: req.user.id,
        },
        include: {
          model: Category,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
