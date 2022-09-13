'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.belongsTo(models.Admin, {foreignKey:'AdminId'})
      Product.hasOne(models.Characteristic, {
        foreignKey: 'ProductId'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    // AdminId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     notNull: true,
    //     notEmpty: true
    //   }
    // },
    image_url: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};