const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, RegistrationValidation, UpdateValidation } = require('../models/User.model');

// ROUTE: /user
// METHOD: GET
// DESCRIPTION: RETRIEVE ALL USERS
router.get('/', async (req, res) => {
    User.find()
        .sort({
            date: -1
        })
        .then(users => {
            res.json({
                status: "success",
                header: "Success",
                message: "Users loaded from the database successfully.",
                data: users
            });
        })
        .catch(err => {
            res.json({
                status: "error",
                header: "Error",
                message: "The users could not be loaded from the database.",
                error: err
            });
        });
});

// ROUTE: /user/:id
// METHOD: GET
// DESCRIPTION: RETRIEVE A SINGLE USER BY ID
router.get('/:id', async (req, res) => {
    User.findOne({
        _id: req.params.id
    })
        .then(user => {
            res.json({
                status: "success",
                header: "Success",
                message: "User loaded from the database successfully.",
                data: user
            });
        })
        .catch(err => {
            res.json({
                status: "error",
                header: "Error",
                message: "The user could not be loaded from the database.",
                error: err
            });
        });
});

// ROUTE: /user/:id
// METHOD: DELETE
// DESCRIPTION: DELETE A SINGLE USER BY ID
router.delete('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    })
        .then(user => {
            user.remove()
                .then(() => {
                    res.json({
                        status: "success",
                        header: "Success",
                        message: "User successfully deleted."
                    });
                })
                .catch(err => {
                    res.json({
                        status: "error",
                        header: "Error",
                        message: "User could not be deleted.",
                        error: err
                    });
                });
        })
        .catch(err => {
            res.json({
                status: "error",
                header: "Error",
                message: "The user could not be deleted from the database.",
                error: err
            });
        });
});

// ROUTE: /user/register
// METHOD: POST
// DESCRIPTION: DELETE A SINGLE USER BY ID
router.post('/register', (req, res) => {
    const { error } = RegistrationValidation(req.body);
    if (error) {
        return res.json({
            status: 'error',
            header: 'Error - ' + error.details[0].path[0],
            message: error.details[0].message
        });
    }
    else {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });

        User.findOne({
            email: req.body.email
        })
            .then(emailMatch => {
                if (emailMatch) {
                    return res.json({
                        status: 'error',
                        header: 'Error',
                        message: 'That email address is already taken.'
                    });
                }
                else {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            return res.json({
                                status: 'error',
                                header: 'Error',
                                message: 'There was an issue salting the password. Contact a system administrator.'
                            });
                        }
                        else {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) {
                                    return res.json({
                                        status: 'error',
                                        header: 'Error',
                                        message: 'There was an issue hashing the password. Contact a system administrator.'
                                    });
                                }
                                else {
                                    newUser.password = hash;

                                    newUser.save()
                                        .then(post => {
                                            return res.json({
                                                status: 'success',
                                                header: 'Success',
                                                message: 'The user has been created successfully.',
                                                data: post
                                            });
                                        })
                                        .catch(err => {
                                            return res.json({
                                                status: 'error',
                                                header: 'Error',
                                                message: 'There was an issue saving the user to the database. Contact a system administrator.',
                                                error: err
                                            });
                                        });
                                }
                            });
                        }
                    });
                }
            });
    }
});

// ROUTE: /user/login
// METHOD: POST
// DESCRIPTION: TAKE EMAIL AND PASSWORD - RETURN JWT TOKEN IF CORRECT
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        created: user.created
                    }

                    let token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: "1h"
                    });

                    return res.json({
                        status: "success",
                        header: "Success",
                        message: "Logged in successfully.",
                        token: token
                    });
                }
                else {
                    return res.json({
                        status: "error",
                        header: "Error",
                        message: "The password you entered is incorrect."
                    });
                }
            }
            else {
                return res.json({
                    status: "error",
                    header: "Error",
                    message: "The username you entered does not exist."
                });
            }
        })
        .catch(err => {
            res.json({ error: err });
        });
});

// ROUTE: /user/:id
// METHOD: PATCH
// DESCRIPTION: ALTER A USER BY ID
router.patch('/:id', (req, res) => {
    var UID = req.params.id;

    var conditions = {
        _id: UID
    }

    var update = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    }

    const { error } = UpdateValidation(update);
    if (error) return res.status(400).json({
        status: 'error',
        header: error.details[0].path[0],
        message: error.details[0].message,
    });

    User.findOne({ email: req.body.email }).then(emailMatch => {
        if (emailMatch && emailMatch._id != UID) {
            return res.json({
                status: "error",
                header: "Error",
                message: "This email address is already registered."
            });
        }
    });

    User.findOneAndUpdate(
        conditions,
        update,
        { useFindAndModify: false }
    )
        .then(user => {
            return res.json({
                status: "success",
                header: "Success",
                message: "The user details you submitted are now stored and up to date.",
                data: user
            });
        })
        .catch(err => {
            return res.json({
                err
            });
        });
})

module.exports = router;