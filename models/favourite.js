'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {

    static associate(models) {
      Favourite.belongsTo(models.User, {foreignKey: "UserId"})
      // Favourite.belongsTo(models.Painting, {foreignKey: "PaintingId"})
    }
  }
  Favourite.init({
    UserId: DataTypes.INTEGER,
    PaintingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};