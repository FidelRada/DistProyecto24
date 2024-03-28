'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Solicitud.belongsTo(models.EstadoSolicitud, { foreignKey: "IdEstado" });
      Solicitud.belongsTo(models.Cliente, { foreignKey: "IdCliente" });
      Solicitud.belongsTo(models.Ciudad, { foreignKey: "IdOrigen", as : "Origen" });
      Solicitud.belongsTo(models.Ciudad, { foreignKey: "IdDestino", as : "Destino" });
      Solicitud.hasMany(models.DetalleSolicitud, { foreignKey: "IdSolicitud" });
    }
  }
  Solicitud.init({
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    },
    IdEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Estado",
        key: "id"
      }
    },
    IdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cliente",
        key: "id"
      }
    },
    IdOrigen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Ciudad",
        key: "id"
      }
    },
    IdDestino: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Ciudad",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Solicitud',
  });
  return Solicitud;
};