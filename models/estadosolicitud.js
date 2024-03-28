'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstadoSolicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EstadoSolicitud.hasMany(models.Solicitud, {foreignKey:"IdEstado"})
    }
  }
  EstadoSolicitud.init({
    Nombre: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        is: "\w+"
      }
    },
    Descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        is: "\w+"
      }
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'EstadoSolicitud',
  });
  return EstadoSolicitud;
};