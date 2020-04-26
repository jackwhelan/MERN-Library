const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookID: {
        type: String
    },
    title: {
        type: String
    },
    authors: {
        type: String
    },
    rating: {
        type: String
    },
    isbn: {
        type: String
    },
    isbn13: {
        type: String
    },
    language_code: {
        type: String
    },
    num_pages: {
        type: String
    },
    ratings_count: {
        type: String
    },
    text_reviews_count: {
        type: String
    },
    publication_date: {
        type: String
    },
    publisher: {
        type: String
    }
});

BookSchema.index({title: 'text'});

const Book = mongoose.model('Book', BookSchema);

exports.Book = Book;
