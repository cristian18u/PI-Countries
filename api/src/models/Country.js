const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    //cambiar ID por id
    ID: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
    },
    continent: {
      type: DataTypes.STRING,
    },
    capital: {
      type: DataTypes.STRING,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.REAL,
    },
    population: {
      type: DataTypes.INTEGER,
    }
  }, {timestamps: false});
};
