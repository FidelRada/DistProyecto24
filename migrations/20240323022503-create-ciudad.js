'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ciudads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Departamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Municipio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Direccion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Token: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique:true
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
    await queryInterface.dropTable('Ciudads');
  }
};