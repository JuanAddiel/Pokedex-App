const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/PokemonController');

router.get("/", pokemonController.GetPokemonList);
router.get("/create-pokemon", pokemonController.GetCreatePokemon);
router.post("/create-pokemon", pokemonController.PostCreatePokemon);
router.get("/edit-pokemon/:pokemonId", pokemonController.GetEditPokemon);
router.post("/edit-pokemon", pokemonController.PostEditPokemon);
router.post("/delete-pokemon", pokemonController.PostDeletePokemon);


module.exports = router;