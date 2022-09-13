'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data.json').iPhone
    data.forEach(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    })

    await queryInterface.bulkInsert("Iphones", data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Iphones", null, {})
  }
};
