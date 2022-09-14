const { Cart, Medicine } = require("../models");

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
      let cart = await Cart.create({
        UserId: req.user.id,
        MedicineId: req.params.medicineId,
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
}

module.exports = cartController;
