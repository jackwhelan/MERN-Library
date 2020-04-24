const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const UserRoute = require('./routes/User.route');

mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log(`DB Connected!`);
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

app.use('/user', UserRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
});
