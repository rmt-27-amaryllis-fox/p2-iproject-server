'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Watchlist.belongsTo(models.User)
    }
  }
  Watchlist.init({
    title: DataTypes.STRING,
    release_year: DataTypes.STRING,
    img_url: DataTypes.STRING,
    kind: DataTypes.STRING,
    movie_id: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Watchlist',
  });
  return Watchlist;
};