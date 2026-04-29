
const movieModel = require("../models/movieModel")
const genreModel = require("../models/genreModel")

exports.indexGet = async (req, res) => {
    const movies = await movieModel.getAllMovies();
    const genres = await genreModel.getAllGenres();
    res.render("index", { movies: movies, genres: genres })
}