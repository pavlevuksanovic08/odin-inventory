require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

const indexRoute = require("./routes/indexRoute");
const genreRoute = require("./routes/genreRoute");
const movieRoute = require("./routes/movieRoute");

app.use("/", indexRoute)
app.use("/genres", genreRoute)
app.use("/movies", movieRoute)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})