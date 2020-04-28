const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User } = require('../models/User.model');
const { Book } = require('../models/Book.model');

// ROUTE: /MyBook
// METHOD: GET
// DESCRIPTION: GET A LIST OF "MyBook" BY USER IDEA
router.post('/', async (req, res) => {
    User.findOne({
        _id: req.body.id
    })
        .then(user => {
            res.json({
                status: "success",
                header: "Success",
                message: "Retrieved MyBooks successfully.",
                data: user.MyBooks.slice(0, req.body.showAmt)
            })
        })
        .catch(err => {
            res.json({
                status: "error",
                header: "Error",
                message: "There was an error retrieving MyBooks from the database.",
                error: err
            });
        })
});

// ROUTE: /MyBook
// METHOD: POST
// DESCRIPTION: ADD A BOOK TO A USERS "MyBooks" ARRAY BY ID
router.post('/add', async (req, res) => {
    Book.findOne({
        _id: req.body.book_id
    })
        .then(book => {
            User.findOne({
                _id: req.body.user_id
            })
                .then(user => {
                    let exists = false
                    for (var i = 0; i < user.MyBooks.length; i++) {
                        if (user.MyBooks[i]._id == req.body.book_id) {
                            exists = true
                        }
                    }

                    if (!exists) {
                        User.findOneAndUpdate(
                            { _id: req.body.user_id },
                            { $push: { MyBooks: book } },
                            { useFindAndModify: false }
                        )
                            .then(() => {
                                res.json({
                                    status: "success",
                                    header: "Success",
                                    message: "Book added to MyBooks!",
                                });
                            })
                            .catch(err => {
                                res.json({
                                    status: "error",
                                    header: "Error",
                                    message: "The book could not be added to MyBooks.",
                                    error: err
                                });
                            });
                    }
                    else {
                        res.json({
                            status: "warning",
                            header: "Add Failure",
                            message: "This book is already in your MyBooks list!",
                        });
                    }

                })
                .catch(err => console.log(err))
        })
        .catch(err => {
            res.json({
                status: "error",
                header: "Error",
                message: "The book you are attempting to add does not exist",
                error: err
            });
        })
});

// ROUTE: /MyBook
// METHOD: POST
// DESCRIPTION: REMOVE A BOOK FROM A USERS "MyBooks" ARRAY BY ID
router.post('/remove', async (req, res) => {
    User.findOne({
        _id: req.body.user_id
    })
        .then(user => {
            let exists = false
            for (var i = 0; i < user.MyBooks.length; i++) {
                if (user.MyBooks[i]._id == req.body.book_id) {
                    exists = true
                }
            }

            if (exists) {
                User.findOneAndUpdate(
                    { '_id': mongoose.Types.ObjectId(req.body.user_id) },
                    { $pull: { "MyBooks": { _id: mongoose.Types.ObjectId(req.body.book_id)} } },
                    { useFindAndModify: false }
                )
                    .then(() => {
                        res.json({
                            status: "success",
                            header: "Success",
                            message: "Book removed from MyBooks!"
                        });
                    })
                    .catch(err => {
                        res.json({
                            status: "error",
                            header: "Error",
                            message: "The book could not be removed from MyBooks.",
                            error: err
                        });
                    });
            }
            else {
                res.json({
                    status: "warning",
                    header: "Remove Failure",
                    message: "This book is not in your MyBooks list!",
                });
            }
        })
        .catch(err => {
            res.json({
                status: "error",
                header: "Error",
                message: "There was an error removing this book!",
                error: err
            });
        })
});

module.exports = router;