const express = require("express");
const router = express.Router();
const controller = require("../controllers/genreController")

router.get("/", controller.genreGet);
router.get("/add", controller.getGenreAdd);
router.post("/add", controller.postGenreAdd);

module.exports = router;