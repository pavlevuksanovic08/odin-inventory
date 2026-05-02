
const express = require("express")
const router = express.Router();
const controller = require("../controllers/movieController")

router.get("/", controller.movieGet)
router.get("/add", controller.addMovieGet);
router.post("/add", controller.postNewMovie);
router.get("/:id", controller.getMovie)

module.exports = router;