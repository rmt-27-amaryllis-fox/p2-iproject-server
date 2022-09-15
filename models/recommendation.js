'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recommendation.belongsTo(models.Plan)
    }
  }
  Recommendation.init({
    PlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Recommendation',
  });
  return Recommendation;
};