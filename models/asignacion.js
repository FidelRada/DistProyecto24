'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asignacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Asignacion.belongsTo(models.Chofer, {foreignKey:"IdChoferAsignado"});
      Asignacion.belongsTo(models.Vehiculo, {foreignKey:"IdVehiculoAsignado"});
      Asignacion.hasMany(models.RegistroSalida, {foreignKey:"IdAsignacion"});
      Asignacion.hasMany(models.DetalleCarga, {foreignKey:"IdAsignacion"});
    }
  }
  Asignacion.init({
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isDate:true
      }
    },
    Nro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNumeric:true
      }
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    },
    IdVehiculoAsignado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"Vehiculo",
        key:"id"
      }
    },
    IdChoferAsignado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"Chofer",
        key:"id"
      }
    }
  }, {
    sequelize,
    modelName: 'Asignacion',
  });
  return Asignacion;
};