"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name cannot empty!",
          },
          notNull: {
            msg: "name cannot empty!",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "imageUrl cannot empty!",
          },
          notNull: {
            msg: "imageUrl cannot empty!",
          },
        },
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "birthDate cannot empty!",
          },
          notNull: {
            msg: "birthDate cannot empty!",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "status cannot empty!",
          },
          notNull: {
            msg: "status cannot empty!",
          },
        },
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "department cannot empty!",
          },
          notNull: {
            msg: "department cannot empty!",
          },
        },
      },
      cloudinary_id: DataTypes.STRING,
    },

    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
