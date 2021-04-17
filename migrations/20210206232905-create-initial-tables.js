'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stretches', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });

    await queryInterface.createTable('steps', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
        allowNull: false,
        primaryKey: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assetUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      assetType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stretchUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'stretches',
          key: 'uuid',
        },
        onDelete: 'restrict',
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('steps');
    await queryInterface.dropTable('stretches');

  }
};
