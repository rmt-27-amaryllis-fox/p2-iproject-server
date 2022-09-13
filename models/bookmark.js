'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookmark.belongsTo(models.User)
      Bookmark.belongsTo(models.Iphone)
    }
  }
  Bookmark.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "UserId is required"},
        notNull: {msg: "UserId is required"}
      }
    },
    IphoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: "ProductId is required"},
        notNull: {msg: "ProductId is required"}
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Color is required"},
        notNull: {msg: "Color is required"}
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
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};