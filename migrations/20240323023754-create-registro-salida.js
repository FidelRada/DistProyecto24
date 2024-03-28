'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RegistroSalidas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      LugarSalida: {
        type: Sequelize.STRING(35),
        allowNull: false
      },
      Token: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique:true
      },
      IdAsignacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Asignacions",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      IdRuta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Ruta",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
    await queryInterface.dropTable('RegistroSalidas');
  }
};