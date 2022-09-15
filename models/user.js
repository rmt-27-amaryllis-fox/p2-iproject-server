"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Service, { through: models.History });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `username cannot be empty`,
          },
          notNull: {
            msg: `username cannot be null`,
          },
        },
      },
      email: {
        unique: {
          msg: `email was registered`,
        },
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `email cannot be empty`,
          },
          notNull: {
            msg: `email cannot be null`,
          },
          isEmail: {
            msg: `email must contain @`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `password cannot be empty`,
          },
          notNull: {
            msg: `password cannot be null`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `role cannot be empty`,
          },
          notNull: {
            msg: `role cannot be null`,
          },
        },
      },
      BirthOfDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `BirthOfDate cannot be empty`,
          },
          notNull: {
            msg: `BirthOfDate cannot be null`,
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `BirthOfDate cannot be empty`,
          },
          notNull: {
            msg: `BirthOfDate cannot be null`,
          },
        },
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `phoneNumber cannot be empty`,
          },
          notNull: {
            msg: `phoneNumber cannot be null`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
