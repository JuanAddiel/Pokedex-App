const Sequelize = require('sequelize');
const sequelize = require('../context/appContext');

const Pokemon = sequelize.define("Pokemon",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    image:{
        type: Sequelize.STRING,
        allowNull: true,
      }
});
module.exports = Pokemon;