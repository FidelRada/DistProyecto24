'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pago.belongsTo(models.Recibo, { foreignKey: "IdRecibo" });
    }
  }
  Pago.init({
    Monto: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    Metodo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: "\w+"
      }
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    },
    IdRecibo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Recibo",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Pago',
  });
  return Pago;
};