const express = require('express');
const router = express.Router();
const RegionController = require('../controllers/RegionesController');

router.get("/", RegionController.GetRegionesList);
router.get("/create-region", RegionController.GetCreateRegion);
router.post("/create-region", RegionController.PostCreateRegion);
router.get("/edit-region/:Id", RegionController.GetEditRegion);
router.post("/edit-region", RegionController.PostEditRegion);
router.post("/delete-region", RegionController.PostDeleteRegion);

module.exports = router;