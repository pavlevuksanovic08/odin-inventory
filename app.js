require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

const indexRoute = require("./routes/indexRoute");

app.use("/", indexRoute)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})