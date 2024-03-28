'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleCarga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleCarga.belongsTo(models.Asignacion, {foreignKey: "IdAsignacion"} )
      DetalleCarga.belongsTo(models.Carga_Paquete, {foreignKey: "IdCargaPaqute"} )
    }
  }
  DetalleCarga.init({
    Fecha: {
      type:DataTypes.DATE,
      allowNull:false,
      validate: {
        isDate: true
      }
    },
    IdAsignacion: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model:"Asignacion",
        key: "id"
      }
    },
    IdCargaPaquete: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model:"Carga_Paquete",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'DetalleCarga',
  });
  return DetalleCarga;
};