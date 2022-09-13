"use strict";
const bcrypt = require("bcryptjs");
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
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Email is required!` },
          notEmpty: { msg: `required` },
          isEmail: { msg: `Email is required` },
        },
        unique: { msg: `Email must be unique!` },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `required` },
          notNull: { msg: `password is required!` },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `required` },
          notNull: { msg: `phone number is required!` },
        },
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      paymentProof: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(helo) {
          helo.password = bcrypt.hashSync(helo.password, 10);
        },
      },
    }
  );
  return User;
};
