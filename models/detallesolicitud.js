'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleSolicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleSolicitud.belongsTo(models.Solicitud, {foreignKey: "IdSolicitud"});
      DetalleSolicitud.belongsTo(models.Carga_Paquete, {foreignKey: "IdCargaPaquete"});
    }
  }
  DetalleSolicitud.init({
    FechaRecepcion: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate:true
      }
    },
    IdSolicitud: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"Solicitud",
        key: "id"
      }
    },
    IdCargaPaquete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"Carga_Paquete",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'DetalleSolicitud',
  });
  return DetalleSolicitud;
};