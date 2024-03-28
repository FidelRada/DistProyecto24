'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tipo.hasMany(models.Carga_Paquete, {foreignKey:"IdTipo"});
    }
  }
  Tipo.init({
    Nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: "\w+"
      }
    },
    Descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Tipo',
  });
  return Tipo;
};