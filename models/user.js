'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Iphone, {through: models.Bookmark})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "Email must be unique"},
      validate: {
        notEmpty: {msg: "Email is required"},
        notNull: {msg: "Email is required"},
        isEmail: {msg: "Must be email format"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Password is required"},
        notNull: {msg: "Password is required"},
        len: {
          args: [5]
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Role is required"},
        notNull: {msg: "Role is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};