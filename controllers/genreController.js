
const model = require("../models/genreModel")

exports.genreGet = async (req, res) => {
    const genres = await model.getAllGenres();
    res.render("genres", { genres: genres});
} 