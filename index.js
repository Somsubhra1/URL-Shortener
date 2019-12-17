// Initializing packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

// Creating app object
const app = express();

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

// Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

// Setting Port to listen to
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
