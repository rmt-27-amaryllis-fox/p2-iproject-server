"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Post.init(
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Image URL is required" },
          notEmpty: { msg: "Image URL is required" },
        },
      },
      caption: DataTypes.STRING,
      weatherMain: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Main weather is required" },
          notEmpty: { msg: "Main weather is required" },
        },
      },
      weatherDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Weather description is required" },
          notEmpty: { msg: "Weather description is required" },
        },
      },
      weatherIcon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Weather icon is required" },
          notEmpty: { msg: "Weather icon is required" },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Country is required" },
          notEmpty: { msg: "Country is required" },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Location is required" },
          notEmpty: { msg: "Location is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID is required" },
          notEmpty: { msg: "User ID is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
