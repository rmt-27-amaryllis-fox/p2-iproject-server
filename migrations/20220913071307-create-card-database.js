'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CardDatabases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cardName: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      cardType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      imageUrlShort: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CardDatabases');
  }
};