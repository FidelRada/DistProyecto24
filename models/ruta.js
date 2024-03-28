'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ruta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ruta.hasMany(models.RegistroSalida, {foreignKey: "IdRuta"});
    }
  }
  Ruta.init({
    Origen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is:"\w+"
      }
    },
    Destino: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is:"\w+"
      }
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Ruta',
  });
  return Ruta;
};