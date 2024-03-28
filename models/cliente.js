'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.belongsTo(models.Persona, { foreignKey: "IdPersona" });
      Cliente.hasMany(models.Recibo, {foreignKey: "IdCliente"});
      Cliente.hasMany(models.Solicitud, {foreignKey: "IdCliente"});
    }
  }
  Cliente.init({
    Telefono: {
      type: DataTypes.STRING(8),
      allowNull:false,
      validate:{
        isNumeric:true
      }
    },
    NIT: {
      type: DataTypes.STRING(8),
      allowNull:false,
      validate:{
        isNumeric:true
      }
    },
    Token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    },
    IdPersona: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Persona",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};