const express = require('express');
const router = express.Router();
const TipoPokeController = require('../controllers/TipoPokeController');

router.get("/", TipoPokeController.GetTiposList);
router.get("/create-tipo", TipoPokeController.GetCreateTipo);
router.post("/create-tipo", TipoPokeController.PostCreateTipo);
router.get("/edit-tipo/:Id", TipoPokeController.GetEditTipo);
router.post("/edit-tipo", TipoPokeController.PostEditTipo);
router.post("/delete-tipo", TipoPokeController.PostDeleteTipo);
module.exports = router;