
const express = require("express")
const router = express.Router();
const controller = require("../controllers/movieController")

router.get("/", controller.movieGet)
router.get("/add", controller.addMovieGet);
router.post("/add", controller.postNewMovie)

module.exports = router;