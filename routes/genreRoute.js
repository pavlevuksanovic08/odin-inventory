const express = require("express");
const router = express.Router();
const controller = require("../controllers/genreController")

router.get("/", controller.genreGet);

module.exports = router;