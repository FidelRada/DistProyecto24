'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Monto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      Fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Metodo: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      Token: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique:true
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
    await queryInterface.dropTable('Pagos');
  }
};