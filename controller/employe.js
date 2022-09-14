const { Employee } = require("../models");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

class EmployeeController {
  static async getEmployee(req, res) {
    try {
      let data = await Employee.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async AddEmployee(req, res) {
    console.log(req.file);
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result.public_id, "<<<<");
      console.log(result);
      let { name, birthDate, status, department } = req.body;
      let data = await Employee.create({
        name,
        imageUrl: result.secure_url,
        birthDate,
        status,
        department,
        cloudinary_id: result.public_id,
      });

      res.status(201).json(data);
    } catch (error) {
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
  static async DeleteEmployee(req, res) {
    try {
      // let id = req.params.id;
      let cloudinary_id = req.params.id;
      // console.log(id, "<< id");
      console.log(cloudinary_id, "<<<");
      let user = await Employee.findOne({ where: { cloudinary_id } });
      console.log(user.cloudinary_id, "cloudinnanry id");
      await cloudinary.uploader.destroy(user.cloudinary_id);
      let data = await Employee.destroy({ where: { cloudinary_id } });
      if (!data) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({ message: ` success deleted` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async FindByPkEmployee(req, res) {
    try {
      let id = req.params.id;
      let data = await Employee.findByPk(id);
      if (!data) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async EditEmployee(req, res) {
    try {
      let cloudinary_id = req.params.id;
      let user = await Employee.findOne({ where: { cloudinary_id } });
      await cloudinary.uploader.destroy(user.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);

      let { name, birthDate, status, department } = req.body;
      let data = await Employee.update(
        {
          name,
          imageUrl: result.secure_url,
          birthDate,
          status,
          department,
        },
        { where: { cloudinary_id } }
        // cloudinary_id: result.public_id,
      );
      res.status(200).json({ message: `succes edited` });
    } catch (error) {
      console.log(error, "<<< dari controller");
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else if (error.name == "File type is not support") {
        res.status(400).json({ message: "harus format jpg.jpeg dan png" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = EmployeeController;
