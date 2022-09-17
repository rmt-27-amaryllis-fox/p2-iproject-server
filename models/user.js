'use strict';
const {generateHash} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Job, {through: "MyJobs", foreignKey:"UserId"})
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {msg: 'Email must be unique'},
      validate:{
        notEmpty:{msg:'Email is required'},
        notNull:{msg:'Email is required'},
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:'Password is required'},
        notNull:{msg:'Password is required'},
      }
    },
    role: {
      type:DataTypes.STRING,
    } 
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options)=>{
    instance.password=generateHash(instance.password)

    if(!instance.role){
      instance.role="Candidate"
    }
  })
  return User;
};