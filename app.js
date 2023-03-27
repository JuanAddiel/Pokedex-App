const path = require('path');
const express = require('express');
const Pokemon = require('./models/pokemon');
const Tipo = require('./models/tiposPokemon');
const Region = require('./models/regiones');
const app = express();
const expressHbs = require('express-handlebars');
const sequelize = require('./context/appContext');
const errorController = require('./controllers/ErrorController');
const compareHelpers = require('./util/helpers/hbs/compare')

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs',
        helpers:{
            equalValue: compareHelpers.EqualValue,
            and: compareHelpers.and,
        },
    })
)

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const PokemonRouter = require('./routes/pokemonAdmin');
const TipoRouter = require('./routes/TipoAdmin');
const RegionRouter = require('./routes/RegionesAdmin');
const HomeRouter= require('./routes/HomeAdmin');


app.use("/managePokemon",PokemonRouter);
app.use("/Tipos",TipoRouter);
app.use("/regiones", RegionRouter);
app.use("/", HomeRouter);



  
app.use("/", errorController.Get404);

Pokemon.belongsTo(Tipo,{constraint: true,onDelete:"CASCADE"});
Tipo.hasMany(Pokemon);
Pokemon.belongsTo(Region,{constraint: true,onDelete:"CASCADE"});
Region.hasMany(Pokemon);

sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})
