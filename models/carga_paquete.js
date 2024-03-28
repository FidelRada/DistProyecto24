'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carga_Paquete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carga_Paquete.belongsTo(models.Tipo, { foreignKey: "IdTipo" });
      Carga_Paquete.hasOne(models.DetalleSolicitud, { foreignKey: "IdCargaPaquete" });
      Carga_Paquete.hasOne(models.DetalleCarga, { foreignKey: "IdCargaPaquete" });
      Carga_Paquete.hasOne(models.DetalleEntrega, { foreignKey: "IdCargaPaquete" });
    }
  }
  Carga_Paquete.init({
    Peso: {
      type:  DataTypes.DOUBLE,
      allowNull: false,
      min: 0.0
    },
    Contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    },
    IdTipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tipo",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Carga_Paquete',
  });
  return Carga_Paquete;
};