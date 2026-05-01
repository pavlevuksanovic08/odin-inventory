
const movieModel = require("../models/movieModel")
const genreModel = require("../models/genreModel")

exports.movieGet = async (req, res) => {
    let gIds = req.query.genres;
    const genres = await genreModel.getAllGenres();
    let movies;
    if (!gIds) {
        movies = await movieModel.getAllMovies();
    } else {

        if (!Array.isArray(gIds)) {
            gIds = [gIds];
        }

        gIds = gIds.map(Number);

        movies = await movieModel.getMoviesByGenre(gIds);
    }

    res.render("movies", {genres, movies, selected: gIds });
}

exports.addMovieGet = async (req, res) => {
    const genres = await genreModel.getAllGenres();
    res.render("addMovie", { genres });
}