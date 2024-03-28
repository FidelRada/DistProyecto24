'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehiculo.belongsTo(models.Dueno, { foreignKey: "IdDueno" });
      Vehiculo.hasMany(models.Asignacion, { foreignKey: "IdVehiculoAsignado" });
    }
  }
  Vehiculo.init({
    Placa: {
      type: DataTypes.STRING(7),
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    Color: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: "\w+"
      }
    },
    Chasis: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    Tonelaje: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    Volumen: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    },
    IdDueno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Dueno",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Vehiculo',
  });
  return Vehiculo;
};