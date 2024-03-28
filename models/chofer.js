'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chofer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chofer.belongsTo(models.Persona, { foreignKey: "IdPersona" });
      Chofer.hasMany(models.Asignacion, { foreignKey: "IdDueno" });
    }
  }
  Chofer.init({
    Telefono: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        isNumeric: true
      }

    },
    TelefonoContacto: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        isNumeric: true
      }

    },
    Codigo: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        isNumeric: true
      }

    },
    NroLicenciaConducir: {
      type: DataTypes.STRING(8),
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
      allowNull: true,
      references: {
        model: "Persona",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Chofer',
  });
  return Chofer;
};