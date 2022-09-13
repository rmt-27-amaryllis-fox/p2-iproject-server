'use strict';
const {hashPassword, isTrue} = require('../helper/brypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data.json').User
    data.forEach(el => {
      el.password = hashPassword(el.password)
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    })

    await queryInterface.bulkInsert("Users", data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
