const { Inventory } = require("../models");
class inventoryController {
  static async getInventory(req, res) {
    try {
      let data = await Inventory.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async AddInventory(req, res) {
    try {
      let { name, image, stock, CategoryId } = req.body;
      let data = await Inventory.create({ name, image, stock, CategoryId });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  //! TINGGAL SAMAIN DENGAN EMPLOYEE DIKIT LAGI
}
module.exports = inventoryController;
