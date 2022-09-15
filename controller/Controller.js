const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { User, Category, History, Service } = require("../models");
const { createToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
const { sequelize } = require("../models");
const createUTSdateforISO = require("../helpers/formateTime");
const midtransClient = require("midtrans-client");

class Controller {
  static async register(req, res, next) {
    try {
      const {
        email,
        password,
        username,
        // role,
        BirthOfDate,
        address,
        phoneNumber,
      } = req.body;
      const body = {
        email,
        password: hashPassword(password),
        username,
        role: `customer`,
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
      // const changeDate = req.body.ServiceDate.split("-");
      // console.log(changeDate);
      // const dateFormatted = `${changeDate[2]}/${changeDate[1]}/${changeDate[0]}`;
      console.log(createUTSdateforISO(req.body.ServiceDate), "dari cont");
      const body = {
        UserId: req.user.id,
        status: `Booked`,
        ServiceDate: createUTSdateforISO(req.body.ServiceDate),
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
            [Op.iLike]: `%Booked%`,
          },
        },
        include: {
          model: Category,
        },
      });
      // console.log(data);
      // const newData = data.ServiceDate.split("T");
      // const newDataAfterFormatting = data.map((el) => {
      //   el.ServiceDate = newData[0];
      //   return el;
      // });
      // console.log();
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
          [Op.and]: [{ UserId: req.user.id }, { status: "Done" }],
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
  static async category(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async payment(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-TuFw2frQ8cgH5JqamkLLCgyF",
      });

      let parameter = {
        transaction_details: {
          order_id: Date.now(),
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: `${req.user.name}`,
          email: `${req.user.email}`,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      // transaction token
      let transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);
      res.status(200).json({ transactionToken });
    } catch (error) {
      next(error);
    }
  }
  static async paymentStatus(req, res, next) {
    try {
      await Service.update(
        { status: "Paid" },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        message: `You're bicycle has paid`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
