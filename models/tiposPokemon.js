const Sequelize = require('sequelize');
const sequelize = require('../context/appContext');

const Tipos = sequelize.define("Tipos",{
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
module.exports= Tipos;