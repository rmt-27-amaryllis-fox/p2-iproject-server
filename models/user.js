'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt-password');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `username cannot be null`
        },
        notEmpty: {
          msg: `username cannot be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: `email must be unique`
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: `email cannot be null`
        },
        notEmpty: {
          msg: `email cannot be empty`
        },
        isEmail: {
          msg: `email must be email format (@)`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `password cannot be null`
        },
        notEmpty: {
          msg: `password cannot be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password)
  })
  return User;
};