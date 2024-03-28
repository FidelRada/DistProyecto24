'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Persona extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Persona.hasOne(models.Chofer, {foreignKey: "IdPersona"});
			Persona.hasOne(models.Dueno, {foreignKey: "IdPersona"});
			Persona.hasOne(models.Consignatario, {foreignKey: "IdPersona"});
			Persona.hasOne(models.Cliente, {foreignKey: "IdPersona"});
		}
	}
	Persona.init({
		Nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
			
		},
		ApellidoPaterno: {
			type: DataTypes.STRING(20),
			allowNull: false,
			
		},
		ApellidoMaterno: {
			type: DataTypes.STRING(20),
			allowNull: false,
			
		},
		CI: {
			type: DataTypes.STRING(8),
			allowNull: false,
			validate: {
				isNumeric: true
			}
		},
		Token: {
		  type: DataTypes.STRING(128),
		  allowNull: false,
		  unique:true
		}
	}, {
		sequelize,
		modelName: 'Persona',
	});
	return Persona;
};