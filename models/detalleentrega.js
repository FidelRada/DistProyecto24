'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleEntrega extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleEntrega.belongsTo(models.Carga_Paquete, { foreignKey: "IdCargaPaquete" });
      DetalleEntrega.belongsTo(models.Entrega, { foreignKey: "IdEntrega" });
    }
  }
  DetalleEntrega.init({
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    IdCargaPaquete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Carga_Paquete",
        key: "id"
      }
    },
    IdEntrega: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Entrega",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'DetalleEntrega',
  });
  return DetalleEntrega;
};