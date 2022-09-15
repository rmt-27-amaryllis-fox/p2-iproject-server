'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }
  }
  UserProfile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `name cannot be null`
        },
        notEmpty: {
          msg: `name cannot be empty`
        }
      }
    },
    bio: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    totalSpellCard: DataTypes.INTEGER,
    totalTrapCard: DataTypes.INTEGER,
    totalMonsterCard: DataTypes.INTEGER,
    totalWin: DataTypes.INTEGER,
    totalLose: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};