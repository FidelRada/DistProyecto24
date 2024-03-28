'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chofers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Telefono: {
        type: Sequelize.STRING(8),
        allowNull:false,
      },
      TelefonoContacto: {
        type: Sequelize.STRING(8),
        allowNull:false,
      },
      Codigo: {
        type: Sequelize.STRING(8),
        allowNull:false,
      },
      NroLicenciaConducir: {
        type: Sequelize.STRING(8),
        allowNull:false,
      },
      Token: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique:true
      },
      IdPersona: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Personas",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable('Chofers');
  }
};