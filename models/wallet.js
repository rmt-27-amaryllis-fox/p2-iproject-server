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
    uuid: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'UUID is required'
        },
        notEmpty : {
          msg : 'UUID is required'
        }
      }
    },
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Coin Name is required'
        },
        notEmpty : {
          msg : 'Coin Name is required'
        }
      }
    },
    iconUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Icon URL is required'
        },
        notEmpty : {
          msg : 'Icon URL is required'
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Coin price is required'
        },
        notEmpty : {
          msg : 'Coin price is required'
        }
      }
    },
    quantity: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Coin quantity is required'
        },
        notEmpty : {
          msg : 'Coin quantity is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};