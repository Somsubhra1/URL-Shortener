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

    // Checking base URL validity
    if (!validUrl.isUri(baseUrl)) {
        return res.status(500).json({ msg: "Invalid base URL" });
    }

    // Generate URL code
    const urlCode = shortid.generate();

    // Check longURL
    if (validUrl.isUri(longUrl)) {
        Url.findOne({ longUrl })
            .then(url => {
                // If URL already present:
                if (url) {
                    return res.status(200).json({ msg: "Success", url });
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
                            res.status(200).json({ msg: "Success", url })
                        )
                        .catch(err =>
                            res
                                .status(500)
                                .json({ msg: "Internal Server Error", err })
                        );
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: "Internal Server Error", err });
            });
    } else {
        res.status(422).json({ msg: "Invalid URL" });
    }
});

module.exports = router;
