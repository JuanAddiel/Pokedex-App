const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController');

router.get("/", homeController.GetPokemonList);
router.post("/list", homeController.PostPokemonByName);
router.post("/region", homeController.PostPokemonByRegion);
module.exports = router;