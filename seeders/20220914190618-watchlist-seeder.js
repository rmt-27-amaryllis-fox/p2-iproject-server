'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Watchlists', [
      {
        ticker: 'AAPL',
        company: 'Apple Inc',
        targetPrice: 250.35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticker: 'MSFT',
        company: 'Microsoft Corporation',
        targetPrice: 253.35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticker: 'TSLA',
        company: 'Tesla Inc',
        targetPrice: 450,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Watchlist', null, {});
  }
};
