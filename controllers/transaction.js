const { Transaction, Cart } = require("../models");

class Controller {
  static async createTransaction(req, res) {
    try {
      const { totalPrice, paymentType } = req.body;

      const itemCheckout = await Cart.findAll({
        where: {
          UserId: req.user.id,
        },
        attributes: ["itemName", "price"],
      });

      const payload = {
        ...req.body,
        UserId: req.user.id,
        item: JSON.stringify(itemCheckout),
      };

      if (!itemCheckout.length) {
        return res.status(400).json({
          message: "There are no item to checkout!",
        });
      }

      const myCart = await Transaction.create(payload);

      if (myCart) {
        await Cart.destroy({
          where: {
            UserId: req.user.id,
          },
        });
      }

      return res.status(200).json(myCart);
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async getTransHistory(req, res) {
    try {
      const trans = await Transaction.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      return res.status(200).json(trans);
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = Controller;
