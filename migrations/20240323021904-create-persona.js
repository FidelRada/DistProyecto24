'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Personas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			Nombre: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			ApellidoPaterno: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			ApellidoMaterno: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			CI: {
				type: Sequelize.STRING(8),
				allowNull: false,
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
		await queryInterface.dropTable('Personas');
	}
};