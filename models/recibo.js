'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recibo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recibo.belongsTo(models.Cliente, { foreignKey: "IdCliente" });
      Recibo.hasOne(models.Pago, { foreignKey: "IdRecibo" });
      Recibo.hasMany(models.DetalleRecibo, { foreignKey: "IdRecibo" });
    }
  }
  Recibo.init({
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    Total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min:0
      }
    },
    Nit: {
      type: DataTypes.STRING(10),
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
    IdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cliente",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Recibo',
  });
  return Recibo;
};