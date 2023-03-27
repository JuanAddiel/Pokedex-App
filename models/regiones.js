const Sequelize = require('sequelize');
const sequelize = require('../context/appContext');

const Regiones = sequelize.define("Regiones",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{ 
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = Regiones;