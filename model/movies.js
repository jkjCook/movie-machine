const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var movieSchema = new Schema({
    "title": String,
    "year": Number,
    "runtime": String,
    "genres": [String],
    "userRating": Number,
    "metaScore": Number,
    "synopsis": String,
    "director": String,
    "writers": [String],
    "stars": [String],
    "trailer": String
});


module.exports = movieSchema;