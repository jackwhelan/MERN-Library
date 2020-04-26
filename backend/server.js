const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

// Configuration
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API Routes
const UserRoute = require('./routes/User.route');
app.use('/user', UserRoute);

const BookRoute = require('./routes/Book.route');
app.use('/book', BookRoute);

// Database Connection
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

// Server Listening
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
});
