'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegistroSalida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RegistroSalida.belongsTo(models.Asignacion, { foreignKey: "IdAsignacion" });
      RegistroSalida.belongsTo(models.Ruta, { foreignKey: "IdRuta" });
    }
  }
  RegistroSalida.init({
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    LugarSalida: {
      type: DataTypes.STRING(35),
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
    IdAsignacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Asignacion",
        key: "id"
      }
    },
    IdRuta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Ruta",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'RegistroSalida',
  });
  return RegistroSalida;
};