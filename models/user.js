'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/helper')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Favorite, { foreignKey: 'UserId' })
      
      User.hasMany(models.Bookmark, { foreignKey: 'UserId' })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Username required`
        },
        notEmpty: {
          msg: `Username required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email is required`
        },
        notEmpty: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Input must be email`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password required`
        },
        notEmpty: {
          msg: `Password required`
        },
        len: {
          args: [5],
          msg: `Password minimal 5 character`
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(user, opt) {
        let encodedPassword = hashPassword(user.password)
        user.password = encodedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};