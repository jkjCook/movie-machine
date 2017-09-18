const mongoose = require("mongoose");
const movieSchema = require("./model/movies");

module.exports = function (connectionString) {
    let Movie;

    return {
        connect: function () {
            return new Promise(function (resolve, reject) {
                let db = mongoose.createConnection(connectionString);

                db.on('error', (err) => {
                    reject(err);
                });
                db.once('open', () => {
                    Movie = db.model("movies", movieSchema);
                    resolve();
                })
            });
        },
        getAllMovies: function () {
            return new Promise(function (resolve, reject) {
                Movie.find()
                    .exec()
                    .then((movies) => {
                        resolve(movies);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getFilteredMovies: function (genre, start, end, starring) {
            return new Promise(function (resolve, reject) {
                start = parseInt(start) - 1;
                end = parseInt(end) + 1;
                if (genre && !start && !end && !starring) {
                    Movie.find({
                        $or: [{ "genres.0.0": genre }, { "genres.1.0": genre }, { "genres.2.0": genre }]
                    })
                        .exec()
                        .then((movies) => {
                            resolve(movies);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
                else if (genre && start && end && !starring) {
                    Movie.find({
                        $or: [{ "genres.0.0": genre }, { "genres.1.0": genre }, { "genres.2.0": genre }],
                        year: { $gt: start, $lt: end }
                    })
                        .exec()
                        .then((movies) => {
                            resolve(movies);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
                else if (genre && start && end && starring) {
                    Movie.find({
                        $and: [
                            { $or: [{ "stars.0.0": starring }, { "stars.1.0": starring }, { "stars.2.0": starring }] },
                            { $or: [{ "genres.0.0": genre }, { "genres.1.0": genre }, { "genres.2.0": genre }] }
                        ],
                        year: { $gt: start, $lt: end }
                    })
                        .exec()
                        .then((movies) => {
                            resolve(movies);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
                else if (genre && !start && !end && starring) {
                    Movie.find({
                        $and: [
                            { $or: [{ "stars.0.0": starring }, { "stars.1.0": starring }, { "stars.2.0": starring }] },
                            { $or: [{ "genres.0.0": genre }, { "genres.1.0": genre }, { "genres.2.0": genre }] }
                        ]
                    })
                        .exec()
                        .then((movies) => {
                            resolve(movies);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
                else if (!genre && start && end && starring) {
                    Movie.find({
                        $and: [
                            { $or: [{ "stars.0.0": starring }, { "stars.1.0": starring }, { "stars.2.0": starring }] }
                        ],
                        year: { $gt: start, $lt: end }
                    })
                        .exec()
                        .then((movies) => {
                            resolve(movies);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
                else if (!genre && start && end && !starring) {
                    Movie.find({
                        year: { $gt: start, $lt: end }
                    })
                        .exec()
                        .then((movies) => {
                            resolve(movies);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            });
        },
        getMovieById: function (id) {
            return new Promise(function (resolve, reject) {
                Movie.find({ _id: id })
                    .exec()
                    .then((movie) => {
                        resolve(movie);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        updateMovieById: function (id, data) {
            return new Promise(function (resolve, reject) {
                Movie.update({ _id: id }, { $set: data }, { multi: false })
                    .exec()
                    .then((movie) => {
                        resolve(movie.title);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        addMovie: function (data) {
            return new Promise(function (resolve, reject) {
                Movie.find({ _id: data._id, year: data.year })
                    .exec()
                    .then(() => {
                        reject({ message: "Movie \"" + data.title + " " + data.year + "\" is already in the DB" });
                    })
                    .catch((err) => {
                        var newMovie = new Movie(data);
                        newMovie.save((err, addedMovie) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(addedMovie);
                            }
                        });
                    });
            });
        },
        getRandom: function () {
            return new Promise(function (resolve, reject) {
                Movie.count().exec(function (err, count) {

                    var random = Math.floor(Math.random() * count);

                    Movie.findOne().skip(random)
                    .exec()
                    .then((movie) =>{
                        resolve(movie);
                    })
                    .catch((err) =>{
                        reject(err);
                    })

                });
            })
        }
    }
};