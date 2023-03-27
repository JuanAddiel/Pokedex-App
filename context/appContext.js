const Sequelizes = require("sequelize");
const path = require("path");

const sequelize = new Sequelizes("sqlite::memory:", {
    dialect: "sqlite",
    storage: path.join(path.dirname(require.main.filename),"database","pokemon.sqlite"),
  }); 
  
  module.exports = sequelize;