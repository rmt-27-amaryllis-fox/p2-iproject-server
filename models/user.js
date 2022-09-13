'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Wallet)
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        args : true,
        msg : "Email must be unique"
      },
      validate : {
        notNull : {
          msg : 'Email is required'
        },
        notEmpty : {
          msg : 'Email is required'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Password is required'
        },
        notEmpty : {
          msg : 'Password is required'
        },
        len : {
          args : [5, 16],
          msg : 'Please create a password that is more than 5 but less than 16 characters !'
        }
      }
    },
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Username is required'
        },
        notEmpty : {
          msg : 'Username is required'
        }
      }
    }
  }, {
    hooks : {
      beforeCreate(user, option){
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};