'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Iphone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Iphone.belongsToMany(models.User, {through: models.Bookmark})
    }
  }
  Iphone.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Name is required"},
        notNull: {msg: "Name is required"}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Price is required"},
        notNull: {msg: "Price is required"}
      }
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Capacity is required"},
        notNull: {msg: "Capacity is required"}
      }
    },
    ram: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Ram is required"},
        notNull: {msg: "Ram is required"}
      }
    },
    CPU: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "CPU is required"},
        notNull: {msg: "CPU is required"}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Description is required"},
        notNull: {msg: "Description is required"}
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Image Url is required"},
        notNull: {msg: "Image Url is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Iphone',
  });
  return Iphone;
};