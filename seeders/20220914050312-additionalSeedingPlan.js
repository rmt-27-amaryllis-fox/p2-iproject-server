'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = require ('../data/planAlaCarte.json').map((el)=>{
      let plan = {
        name: el.name,
        description: el.description,
        price: el.price,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return plan
     })
     await queryInterface.bulkInsert('Plans', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Plans', null, {})
  }
};
