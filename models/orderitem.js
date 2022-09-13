'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {foreignKey:'OrderId'})
    }
  }
  OrderItem.init({
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    PlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    quantity:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    priceSum:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};