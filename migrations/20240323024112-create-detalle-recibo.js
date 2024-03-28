'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleRecibos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Precio: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      IdRecibo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Recibos",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      IdEntrega: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Entregas",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
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
    await queryInterface.dropTable('DetalleRecibos');
  }
};