const {body, validationResult } = require("express-validator")

const movieModel = require("../models/genreModel")
const genreModel = require("../models/genreModel")

exports.genreGet = async (req, res) => {
    const genres = await movieModel.getAllGenres();
    res.render("genres", { genres: genres});
}

exports.getGenreAdd = (req, res) => {
    res.render("addGenre");
}

const insertGenreValidator = [
    body("name").trim()
    .notEmpty().withMessage("Genre is required.")
    .isLength({ min: 2 }).withMessage("Genre must be at least 2 characters.")
    .custom(async (value) => {
        const rows = await genreModel.validateGenreDuplication(value);

        if (rows.length > 0) {
            throw new Error("Genre already exists.");
        }

        return true;
    })
]

exports.postGenreAdd = [
    insertGenreValidator,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('addGenre', {
                errors: errors.array(),
            });
        }

        const genreName = req.body.name;
        await genreModel.insertGenre(genreName);
        const genres = await genreModel.getAllGenres();
        res.render("genres", {genres: genres})
    }
]