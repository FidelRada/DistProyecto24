'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleRecibo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleRecibo.belongsTo(models.Recibo, { foreignKey: "IdRecibo"});
      DetalleRecibo.belongsTo(models.Entrega, { foreignKey: "IdEntrega"});
    }
  }
  DetalleRecibo.init({
    Precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    IdRecibo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Recibo",
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
    modelName: 'DetalleRecibo',
  });
  return DetalleRecibo;
};