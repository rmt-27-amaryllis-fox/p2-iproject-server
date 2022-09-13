"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data.json").Bookmark;
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Bookmarks", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
