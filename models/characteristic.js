'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Characteristic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Characteristic.belongsTo(models.Product)
    }
  }
  Characteristic.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    is_easy: DataTypes.BOOLEAN,
    is_small: DataTypes.BOOLEAN,
    is_purifying: DataTypes.BOOLEAN,
    is_toxic: DataTypes.BOOLEAN,
    has_specific_condition: DataTypes.BOOLEAN,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Characteristic',
  });
  return Characteristic;
};