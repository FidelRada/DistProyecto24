'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carga_Paquetes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Peso: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      Contenido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Token: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique:true
      },
      IdTipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tipos",
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
    await queryInterface.dropTable('Carga_Paquetes');
  }
};