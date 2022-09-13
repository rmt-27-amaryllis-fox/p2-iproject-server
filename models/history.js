"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsToMany(models.User, { foreignKey: "UserId" });
      History.belongsToMany(models.ServiceId, { foreignKey: "ServiceId" });
    }
  }
  History.init(
    {
      UserId: DataTypes.INTEGER,
      ServiceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
