'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsToMany(models.User, {through: 'MyJobs', foreignKey:"JobId"})
    }
  }
  Job.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {msg:'Title is required'},
        notNull:{msg:'Title is required'},
      }
    },
    type: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {msg:'Type is required'},
        notNull:{msg:'Type is required'},
      }
    },
    location: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {msg:'Location is required'},
        notNull:{msg:'Location is required'},
      }
    },
    requirement: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {msg:'Requirement is required'},
        notNull:{msg:'Requirement is required'},
      }
    },
    position: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {msg:'Position is required'},
        notNull:{msg:'Position is required'},
      }
    },
    test_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notEmpty: {msg:'Test Date is required'},
        notNull:{msg:'Test Date is required'},
      }
    } 
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};