const { Cart } = require("../models");

class Controller {
  static async addToCart(req, res) {
    try {
      req.body.UserId = req.user.id;
      const myCart = await Cart.create(req.body);
      return res.status(200).json(myCart);
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async getCart(req, res) {
    try {
      const myCart = await Cart.findAll({
        where: {
          UserId: req.user.id,
        },
      });
      return res.status(200).json(myCart);
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async deleteCart(req, res) {
    try {
      const { id } = req.body;

      const myCart = await Cart.findByPk(id);

      if (!myCart) {
        res.status(400).send({
          message: "Item not found",
        });
      }

      await myCart.destroy();

      return res.status(200).json({
        message: "Success delete item from cart",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}
module.exports = Controller;
