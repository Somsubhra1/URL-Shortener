// Initializing packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv/config");

// Creating app object
const app = express();

// Set view engine
app.set("view engine", "ejs");

// Connecting to MongoDB
mongoose
    .connect(process.env.MongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(`Error connecting to MongoDB: ${err}`));

// ExpressJS Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files middleware:
app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

// Setting Port to listen to
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
