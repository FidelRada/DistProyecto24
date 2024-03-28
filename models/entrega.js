'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entrega extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entrega.belongsTo(models.Consignatario, { foreignKey: "IdConsignatario" });
      Entrega.hasOne(models.DetalleRecibo, { foreignKey: "IdEntrega" });
      Entrega.hasMany(models.DetalleEntrega, { foreignKey: "IdEntrega" });
    }
  }
  Entrega.init({
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    },
    IdConsigantario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Consignatario",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Entrega',
  });
  return Entrega;
};