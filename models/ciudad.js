'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ciudad.hasMany(models.Solicitud, {foreignKey: "IdOrigen"});
      Ciudad.hasMany(models.Solicitud, {foreignKey: "IdDestino"});
    }
  }
  Ciudad.init({
    Departamento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is:"\w+"
      }
    },
    Municipio: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is:"\w+"
      }
    },
    Direccion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Ciudad',
  });
  return Ciudad;
};