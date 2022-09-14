const { Cart, Medicine } = require("../models");
const axios = require("axios");

class cartController {
  static async getCart(req, res, next) {
    try {
      const id = req.user.id;
      const data = await Cart.findAll({
        include: [Medicine],
        where: { UserId: id },
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }
  static async addToCart(req, res, next) {
    try {
      let medicine = await Medicine.findByPk(req.params.medicineId);
      if (!medicine) throw { name: "NotFound" };
      let cart = await Cart.findOrCreate({
        where: { MedicineId: medicine.id },
        defaults: {
          UserId: req.user.id,
          MedicineId: req.params.medicineId,
        },
      });
      res.status(201).json({
        id: cart.id,
        UserId: cart.UserId,
        MedicineId: cart.MedicineId,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async shippingFee(req, res, next) {
    try {
      const { data } = await axios({
        url: "https://api.rajaongkir.com/starter/cost",
        method: "post",
        headers: {
          key: "475e4d87e29f3618dbaf02f6d2250a75",
        },
        data: {
          origin: 151,
          destination: req.body.destination,
          weight: req.body.weight,
          courier: req.body.courier,
        },
      });
      res.status(200).json(data.rajaongkir.results[0].costs[0].cost);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const id = req.params.id;
      let result = await Cart.destroy({ where: { id } });
      res.status(200).json({ message: "Success delete cart" });
    } catch (err) {
      next();
    }
  }
}

module.exports = cartController;
