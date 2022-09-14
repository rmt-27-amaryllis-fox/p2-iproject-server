'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardDatabase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CardDatabase.belongsTo(models.User)
    }
  }
  CardDatabase.init({
    cardName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `card name cannot be null`
        },
        notEmpty: {
          msg: `card name cannot be empty`
        }
      }
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `card type cannot be null`
        },
        notEmpty: {
          msg: `card type cannot be empty`
        }
      }
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `IMG URL cannot be null`
        },
        notEmpty: {
          msg: `IMG URL cannot be empty`
        }
      }
    },
    imageUrlShort: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `IMG URL cannot be null`
        },
        notEmpty: {
          msg: `IMG URL cannot be empty`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CardDatabase',
  });
  return CardDatabase;
};