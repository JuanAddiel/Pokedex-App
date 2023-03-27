const Pokemon = require('../models/pokemon');
const Tipos = require('../models/tiposPokemon');
const Regiones = require('../models/regiones');

exports.GetPokemonList = (req, res, next) => {
    Pokemon.findAll({ include: [{ model: Tipos }, { model: Regiones }] })
        .then((result) => {
            const pokemon = result.map((result) => result.dataValues);

            res.render("managePokemon/pokemon-list", {
                pageTitle: "Pokemon",
                homePok: true,
                poke: pokemon,
                hasPokemo: pokemon.length > 0,

            });
        })
        .catch((error) => {
            console.log(error);
        })
}

exports.GetCreatePokemon = (req, res, next) => {
        Tipos.findAll()
            .then((result) => {
                const tipo = result.map((result) => result.dataValues);
                Regiones.findAll()
                    .then((result) => {
                        const region = result.map((result) => result.dataValues);
                        res.render("managePokemon/save-pokemon", {
                            pageTitle: "Create Pokemon",
                            homePok: true,
                            editMode: false,
                            tipo: tipo,
                            region: region,
                            hasTipo: tipo.length > 0,
                            hasRegion: region.length > 0,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })

    }

    exports.PostCreatePokemon = (req, res, next) => {
        const PokemonName = req.body.Name;
        const PokemonImg = req.body.Imagen;
        const PokemonId = req.body.Id;
        const PokemonRegion = req.body.Region;
        const PokemonTipo = req.body.Tipo;
        Pokemon.create({
            name: PokemonName,
            image: PokemonImg,
            id: PokemonId,
            RegioneId: PokemonRegion,
            TipoId: PokemonTipo
        })
            .then((result) => {
                res.redirect("/managePokemon");
            })
            .catch((err) => {
                console.log(err);
            })

    }

    exports.GetEditPokemon = (req, res, next) => {
        const edit = req.query.edit;
        const pokemonId = req.params.pokemonId;

        if (!edit) {
            return res.redirect("/managePokemon");
        }
        Pokemon.findOne({ where: { id: pokemonId } })
            .then((result) => {
                const pokemon = result.dataValues;
                if (!pokemon) {
                    return res.redirect("/managePokemon");
                }
                console.log(pokemon);
                Tipos.findAll()
                    .then((result) => {
                        const tipo = result.map((result) => result.dataValues);
                        Regiones.findAll()
                            .then((result) => {
                                const region = result.map((result) => result.dataValues);

                                res.render("managePokemon/save-pokemon", {
                                    pageTitle: "Edit Pokemon",
                                    homeActive: false,
                                    editMode: edit,
                                    poke: pokemon,
                                    tipo: tipo,
                                    region: region,
                                    hasTipo: tipo.length > 0,
                                    hasRegion: region.length > 0,
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    };

    exports.PostEditPokemon = (req, res, next) => {
        const PokemonName = req.body.Name;
        const PokemonImg = req.body.Imagen;
        const PokemonId = req.body.pokemonId;
        const TipoId = req.body.Tipo;
        const RegionId = req.body.Region;

        Pokemon.update(
            { name: PokemonName, image: PokemonImg, TipoId: TipoId, RegioneId: RegionId },
            { where: { id: PokemonId } }
        )
            .then((result) => {
                return res.redirect("/managePokemon");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    exports.PostDeletePokemon = (req, res, next) => {
        const PokemonId = req.body.pokemonId;

        Pokemon.destroy({ where: { id: PokemonId } })
            .then((result) => {
                return res.redirect("/managePokemon");
            })
            .catch((err) => {
                console.log(err);
            });
    };


//Filter pokemon for name




// exports.GetFilterPokemon = (req, res, next) => {
//     const PokemonName = req.body.Name;
//     const PokemonType = req.body.Type;
//     const PokemonRegion = req.body.Region;
//     const PokemonId = req.body.Id;
//     Pokemon.findAll({ where: { name: PokemonName } })
//         .then((result) => {
//             const pokemon = result.map((result) => result.dataValues);
//             res.render("managePokemon/pokemon-list", {
//                 pageTitle: "Pokemon",
//                 homeActive: true,
//                 poke: pokemon,
//                 hasPokemo: pokemon.length > 0,
//             });
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }
