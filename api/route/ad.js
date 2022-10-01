const express = require("express");
const router = express.Router();

const adsController = require("../controller/ads.controller");

router.get("/search-by-name", adsController.searchByName);

module.exports = router;
