'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consignatario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Consignatario.belongsTo(models.Persona, { foreignKey: "IdPersona" });
      Consignatario.hasMany(models.Entrega, { foreignKey: "IdConsignatario" });
    }
  }
  Consignatario.init({
    Telefono: {
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
    },
    IdPersona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Persona",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Consignatario',
  });
  return Consignatario;
};