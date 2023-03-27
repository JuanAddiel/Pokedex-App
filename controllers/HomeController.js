const Pokemon = require('../models/pokemon');
const Tipos = require('../models/tiposPokemon');
const Regiones = require('../models/regiones');

exports.getList = (req, res, next) => {
    Regiones.findAll()
    .then((result) => {
        const region = result.map((result) => result.dataValues);
    Pokemon.findAll({ include: [{ model: Tipos }, { model: Regiones }] })
        .then((result) => {
            const pokemon = result.map((result) => result.dataValues);

            res.render("Home/pokemon-list", {
                pageTitle: "Pokemon",
                poke: pokemon,
                region: region,
                hasPokemon: pokemon.length > 0,
                hasRegion: region.length > 0

            });
        })
        .catch((error) => {
            console.log(error);
        })
    })
}


exports.PostPokemonByName = (req, res, next) => {
    const PokemonName = req.body.Name;
    Pokemon.findAll({ include: [{ model: Tipos }, { model: Regiones }], where: { name: PokemonName } })
        .then((result) => {
            const pokemon = result.map((result) => result.dataValues);
            res.render("Home/pokemon-list", {
                pageTitle: "Pokemon",
                poke: pokemon,
                hasPokemon: pokemon.length > 0,
                filtro: true
            });
        })
        .catch((error) => {
            console.log(error);
        })
}

exports.PostPokemonByRegion = (req, res, next) => {
    const PokemonRegion = req.body.Region;
    Regiones.findAll()
        .then((result) => {
            const region = result.map((result) => result.dataValues);
            Pokemon.findAll({ include: [{ model: Tipos }, { model: Regiones }], where: { RegioneId: PokemonRegion } })
                .then((result) => {
                    const pokemon = result.map((result) => result.dataValues);
                    console.log(region[0].name);
                    res.render("Home/pokemon-list",
                        {
                            pageTitle: "Pokemon",
                            region: region,
                            poke: pokemon,
                            hasPokemon: pokemon.length > 0,
                            hasRegion: region.length > 0
                        });
                }).catch((error) => { console.log(error); })
        })
}



//I want to filter for region

