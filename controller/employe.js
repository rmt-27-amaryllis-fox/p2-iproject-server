const { Employee } = require("../models");

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
    try {
      let { name, imageUrl, birthDate, status, department } = req.body;
      let data = await Employee.create({
        name,
        imageUrl,
        birthDate,
        status,
        department,
      });

      res.status(200).json(data);
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
      let id = req.params.id;
      let data = await Employee.destroy({ where: { id } });
      if (!data) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({ message: ` success deleted` });
    } catch (error) {
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
      let id = req.params.id;
      let { name, imageUrl, birthDate, status, department } = req.body;
      let data = await Employee.update(
        { name, imageUrl, birthDate, status, department },
        { where: { id } }
      );
      res.status(200).json({ message: `succes edited` });
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
}

module.exports = EmployeeController;
