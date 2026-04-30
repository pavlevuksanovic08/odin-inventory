
const express = require("express")
const route = express.Router();
const controller = require("../controllers/movieController")

route.get("/", controller.movieGet)

module.exports = route;