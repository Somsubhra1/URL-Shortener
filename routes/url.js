// Initializing packages
const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
require("dotenv/config");

// Importing Database Model
const Url = require("../models/Url");

// Initialising router object
const router = express.Router();

// @route   POST /api/url/shorten
// @desc    Create short url
router.post("/shorten", (req, res) => {
    const { longUrl } = req.body;

    const baseUrl = process.env.baseURL;

    // Checking if user is trying to shorted our URL
    if (longUrl.includes(baseUrl)) {
        return res
            .status(422)
            .json({ msg: "Don't try to shorten our URL", statusCode: 422 });
    }

    // Checking base URL validity
    if (!validUrl.isUri(baseUrl)) {
        return res
            .status(500)
            .json({ msg: "Internal Server Error", statusCode: 500 });
    }

    // Generate URL code
    const urlCode = shortid.generate();

    // Check longURL
    if (validUrl.isUri(longUrl)) {
        Url.findOne({ longUrl })
            .then(url => {
                // If URL already present:
                if (url) {
                    return res
                        .status(200)
                        .json({ msg: "Success", statusCode: 200, url });
                } else {
                    // Creating new shortUrl
                    const shortUrl = baseUrl + "/" + urlCode;

                    const newUrl = new Url({
                        longUrl,
                        shortUrl,
                        urlCode
                    });

                    // Saving record to database
                    newUrl
                        .save()
                        .then(url =>
                            res
                                .status(200)
                                .json({ msg: "Success", statusCode: 200, url })
                        )
                        .catch(err =>
                            res.status(500).json({
                                msg: "Internal Server Error",
                                statusCode: 500,
                                err
                            })
                        );
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal Server Error",
                    statusCode: 500,
                    err
                });
            });
    } else {
        res.status(422).json({ msg: "Invalid URL", statusCode: 422 });
    }
});

module.exports = router;
