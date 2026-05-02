const { body, validationResult } = require("express-validator")

const movieModel = require("../models/movieModel")
const genreModel = require("../models/genreModel")
const directorModel = require("../models/directorModel")

exports.movieGet = async (req, res) => {
    let gIds = req.query.genres;
    const genres = await genreModel.getAllGenres();
    let movies;
    if (!gIds) {
        movies = await movieModel.getAllMovies();
        gIds = [];
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
    res.render("addMovie", { genres: genres });
}


const validateAddMovie = [
    body("title").trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 2 }).withMessage("Title must have at least 2 characters"),
    body("genres")
    .notEmpty().withMessage("Genre must be selected."),
    body("director").trim()
    .notEmpty().withMessage("Director is required")
    .isLength({ min: 2 }).withMessage("Director must be at least 2 characters.")
    .matches(/^[A-Za-z\s'\.]+$/)
    .withMessage("Only letters, spaces, dots and apostrophes are allowed")]

exports.postNewMovie = [
    validateAddMovie,
    async (req, res) => {
        const errors = validationResult(req);
        const genres = await genreModel.getAllGenres()

        if (!errors.isEmpty()) {
            return res.render("addMovie", {genres, errors: errors.array(), old: req.body})
        }

        const title = req.body.title;
        const gIds = req.body.genres;
        const director = req.body.director;

        const dId = await directorModel.createDirector(director);
        const mId = await movieModel.createMovie(title, dId)
        
        for (let gId of gIds) {
            await movieModel.addToMovieGenre(mId, Number(gId))
        }

        const movies = await movieModel.getAllMovies();

        res.render("movies", {movies, genres, selected: []})
    }
]

exports.getMovie = async (req, res) => {
    const id = Number(req.params.id);
    const movie = await movieModel.getMovieById(id);
    res.render("viewMovie", { movie: movie })
}