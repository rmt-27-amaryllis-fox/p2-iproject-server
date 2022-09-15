'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Painting extends Model {

    static associate(models) {
      Painting.belongsTo(models.User, ({foreignKey: "UserId"}))
    }
  }
  Painting.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    created: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    wiki: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Painting',
  });
  return Painting;
};