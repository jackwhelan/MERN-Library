const express = require('express');
const router = express.Router();
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
