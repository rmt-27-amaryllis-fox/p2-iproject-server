"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "description", {
      type: Sequelize.TEXT,
    });

    await queryInterface.addColumn("Users", "location", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "description");

    await queryInterface.removeColumn("Users", "location");
  },
};
