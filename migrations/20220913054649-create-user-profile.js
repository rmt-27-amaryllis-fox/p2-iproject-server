'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      totalSpellCard: {
        type: Sequelize.INTEGER
      },
      totalTrapCard: {
        type: Sequelize.INTEGER
      },
      totalMonsterCard: {
        type: Sequelize.INTEGER
      },
      totalWin: {
        type: Sequelize.INTEGER
      },
      totalLose: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('UserProfiles');
  }
};