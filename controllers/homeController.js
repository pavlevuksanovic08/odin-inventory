
const movieModel = require("../models/movieModel")
const genreModel = require("../models/genreModel")

exports.indexGet = async (req, res) => {
    const genreId = req.query.genre;
    let movies;
    let genres = await genreModel.getAllGenres();
    if (genreId == 0) {
        movies = await movieModel.getAllMovies();
        
    } else {
        movies = await movieModel.getMoviesByGenre(genreId);
    }
    
    res.render("index", { movies: movies, genres: genres, selected: genreId })
}