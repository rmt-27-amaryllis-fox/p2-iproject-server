const { User } = require("../models");
const { createToken } = require("../helper/jwt");
const nodeMail = require("../server");
const axios = require("axios");
const crypto = require("crypto-js");
class Controller {
  static async register(req, res) {
    try {
      let { email, password, phoneNumber, bank } = req.body;
      let data = await User.create({ email, password, phoneNumber });
      if (data) {
        let payment = await axios({
          method: "post",
          url: "https://api.sandbox.midtrans.com/v2/charge",
          data: {
            payment_type: "bank_transfer",
            transaction_details: {
              gross_amount: 50000,
              order_id: `order-${Math.random()}-${email}`,
            },
            customer_details: {
              email: email,
              first_name: "budi",
              last_name: "utomo",
              phone: phoneNumber,
            },
            item_details: [
              {
                id: "item01",
                price: 50000,
                quantity: 1,
                name: "Subscription ANIMEDORO",
              },
            ],
            bank_transfer: {
              bank: bank,
              va_number: "12345678901",
            },
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          auth: {
            username: "SB-Mid-server-M94uk5lRjFkavtRD5047yWYO",
            password: "",
          },
        });
        // console.log(payment, "<<");
        console.log(payment.data, "<<<<<<");
        if (payment) {
          await User.update(
            { paymentProof: payment.data.order_id },
            { where: { email: email } }
          );

          await nodeMail(email, payment.data.va_numbers[0].va_number);
        }
        res.status(201).json(payment.data);
      }
    } catch (error) {
      console.log(error, "eroasdfr");
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        let errors = [];
        error.errors.forEach((e) => {
          errors.push({ message: e.message });
        });
        res.status(400).json(errors);
      } else {
        res.status(500).json({ messge: `Internal Server Error.` });
      }
    }
  }

  static async login(req, res) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: `Email&Password is required` });
      }
      let findUser = await User.findOne({ where: { email } });
      if (!findUser) throw { name: `gak nemu` };
      let payload = {
        id: findUser.id,
      };
      let access_token = createToken(payload);
      res.status(200).json({
        access_token,
        paid: findUser.paid,
        paymentProof: findUser.paymentProof,
      });
    } catch (error) {
      console.log(error);
      if (error.name == `gak nemu`) {
        res.status(401).json({ message: `Invalid email/password` });
      } else {
        res.status(500).json({ messge: `Internal Server Error.` });
      }
    }
  }

  static async webHook(req, res) {
    console.log(req.body, "ini huks");
    try {
      if (req.body.transaction_status === "settlement") {
        let toDataBase = JSON.stringify([req.body]);
        await User.update(
          { paymentProof: toDataBase, paid: true },
          { where: { paymentProof: req.body.order_id } }
        );
      }
      //   console.log(req.body, "hook");
      res.status(200).json(req.body);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
