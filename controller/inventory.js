const { Inventory, Category } = require("../models");
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
  static async editInventory(req, res) {
    try {
      let id = req.params.id;
      let { name, image, stock, CategoryId } = req.body;
      let data = await Inventory.create(
        { name, image, stock, CategoryId },
        { where: { id } }
      );
      res.status(200).json({ message: "success edited" });
    } catch (error) {
      console.log(error);
      if (error.name == "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async deleteInventory(req, res) {
    try {
      let id = req.params.id;
      let data = await Inventory.destroy({ where: { id } });
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.status(200).json({ message: "Success Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async FindByPkInventory(req, res) {
    try {
      let id = req.params.id;
      let data = await Inventory.findByPk(id);
      if (!data) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //! untuk ambil category numpang disini
  static async getCategory(req, res) {
    try {
      let data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = inventoryController;
