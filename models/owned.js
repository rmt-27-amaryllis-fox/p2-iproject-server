'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owned extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Owned.belongsTo(models.User, ({foreignKey:"UserId"}))
    }
  }
  Owned.init({
    price: DataTypes.INTEGER,
    purchaseDate: DataTypes.STRING,
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Owned',
  });
  return Owned;
};