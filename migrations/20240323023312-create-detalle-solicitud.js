'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleSolicituds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FechaRecepcion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      IdSolicitud: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:"Solicituds",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      IdCargaPaquete: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:"Carga_Paquetes",
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
    await queryInterface.dropTable('DetalleSolicituds');
  }
};