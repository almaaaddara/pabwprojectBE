'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penerbangan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      departure_time: {
        type: Sequelize.DATE
      },
      arival_time: {
        type: Sequelize.DATE
      },
      plane_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pesawat',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      depart_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bandara',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      destination_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bandara',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Penerbangan');
  }
};