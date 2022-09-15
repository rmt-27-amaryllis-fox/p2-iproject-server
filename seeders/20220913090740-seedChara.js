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
   let data = require('../data/characteristic.json').map((el)=>{
    let chara = {
      ProductId: el.ProductId,
      is_easy: el.is_easy,
      is_small: el.is_small,
      is_purifying: el.is_purifying,
      is_toxic: el.is_toxic,
      has_specific_condition: el.has_specific_condition,
      description: el.description,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return chara
   })
   await queryInterface.bulkInsert('Characteristics', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Characteristics', null, {})
  }
};
