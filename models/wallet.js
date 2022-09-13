'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.User)
    }
  }
  Wallet.init({
    UserId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'UserId is required'
        },
        notEmpty : {
          msg : 'UserId is required'
        }
      }
    },
    CoinId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'CoinId is required'
        },
        notEmpty : {
          msg : 'CoinId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};