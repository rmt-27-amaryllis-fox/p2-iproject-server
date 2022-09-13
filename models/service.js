"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsToMany(models.User, { through: models.History });
    }
  }
  Service.init(
    {
      UserId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      ServiceDate: DataTypes.DATE,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
