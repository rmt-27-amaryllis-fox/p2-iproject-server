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
     let data = require('../data/planItemAlaCarte.json').map((el)=>{
      let item={
        ProductId: el.ProductId,
        PlanId: el.PlanId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return item
     })
  
     await queryInterface.bulkInsert('PlanItems', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('PlanItems', null, {})
  }
};
