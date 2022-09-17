'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyJob.belongsTo(models.User, {foreignKey:"UserId"});
      MyJob.belongsTo(models.Job, {foreignKey:"JobId"})
    }
  }
  MyJob.init({
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty: {msg:'UserId is required'},
        notNull:{msg:'UserId is required'},
      }
    },
    JobId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty: {msg:'JobId is required'},
        notNull:{msg:'JobId is required'},
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MyJob',
  });
  MyJob.beforeCreate((instance, options)=>{
    instance.status="Applied"
  })
  return MyJob;
};