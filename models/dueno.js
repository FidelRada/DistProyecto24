'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dueno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dueno.belongsTo(models.Persona, { foreignKey: "IdPersona" });
      Dueno.hasMany(models.Vehiculo, { foreignKey: "IdDueno" });
    }
  }
  Dueno.init({
    Telefono: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        isNumeric: true
      }

    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    RUDE: {
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
    IdPersona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Persona",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Dueno',
  });
  return Dueno;
};