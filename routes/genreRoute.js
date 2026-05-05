const express = require("express");
const router = express.Router();
const controller = require("../controllers/genreController")

router.get("/", controller.genreGet);
router.get("/add", controller.getGenreAdd);
router.post("/add", controller.postGenreAdd);
router.get("/:id/edit", controller.getEdit);
router.post("/:id/edit", controller.postGenreEdit);
router.post("/:id/delete", controller.postDeleteGenre)

module.exports = router;