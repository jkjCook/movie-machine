var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require("cors");
var path = require('path');
const connectionString = "mongodb://jcook:zxcvbnm123@ds047592.mlab.com:47592/movie-machine";
const dataService = require("./service.js");
const service = dataService(connectionString);
const scrape = require('./scraper/scrape.js');

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

//Route for index
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/movies", (req, res) => {
    if (req.query.genre || req.query.start || req.query.end ||
        req.query.starring || req.query.rating) {
        service.getFilteredMovies(req.query.genre, req.query.start, req.query.end, 
        req.query.starring, req.query.rating)
            .then((movies) => {
                res.json(movies);
            })
            .catch((err) => {
                res.json({ message: err });
            });
    }
    else {
        service.getAllMovies()
            .then((movies) => {
                res.json(movies);
            })
            .catch((err) => {
                res.json({ message: err });
            });
    }
});

app.get("/movie/:movieId", (req, res) => {
    service.getMovieById(req.params.movieId)
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            res.json({ message: err })
        });
});
app.put("/movie/:movieId", (req, res) => {
    service.updateMovieById(req.params.movieId, req.body)
        .then((movie) => {
            res.json({ "message": "\"" + movie + "\" updated successfully" });
        })
        .catch((err) => {
            res.json({ message: err })
        });
});

app.post("/scrape/add", (req, res) => {
    scrape.scrapeUrl(req.body.url).then((data) => {
        service.addMovie(data).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })
    }).catch((err) => {
        console.log(err);
        res.redirect(__dirname + "/public/views/scrape.html")
    });
});
app.get("/random", (req, res) => {
    service.getRandom().then((data) => {
        res.json(data);
    })
});
app.use((req, res) => {
    res.status(404).end();
});

service.connect().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("API Listening on: " + HTTP_PORT);
    });
}).catch((err) => {
    console.log("Unable to connect to API");
})
