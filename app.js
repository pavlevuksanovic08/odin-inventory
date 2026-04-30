require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

const indexRoute = require("./routes/indexRoute");
const genreRoute = require("./routes/genreRoute")

app.use("/", indexRoute)
app.use("/genres", genreRoute)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})