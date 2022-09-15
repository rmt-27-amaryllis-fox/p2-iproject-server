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
        allowNull: false,
        type: Sequelize.STRING
      },
      bio: {
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
      totalSpellCard: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalTrapCard: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalMonsterCard: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalWin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalLose: {
        allowNull: false,
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