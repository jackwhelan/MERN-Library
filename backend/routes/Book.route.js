const express = require('express');
const router = express.Router();

const { Book } = require('../models/Book.model');

router.get('/', async (req, res) => {
    const showAmt = parseInt(req.query.showAmt);
    const search = req.query.search;

    Book.find({$text: {$search: search}})
    .limit(showAmt)
    .then(books => {
        res.json(books);
    })
    .catch(err => {
        res.json({
            status: "error",
            header: "Error",
            message: "The books could not be loaded from the database.",
            error: err
        });
    });
});

module.exports = router;