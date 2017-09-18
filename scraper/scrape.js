const request = require("request");
const cheerio = require("cheerio");

module.exports.scrapeUrl = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);

                var title, year, runtime, genres = [], userRating, poster, metaScore;
                var synopsis, director, writers = [], stars = [], trailer;
                var json = {
                    title: "", year: 0, runtime: "", genres: [], userRating: 0, poster: "",
                    metaScore: -1, synopsis: "", director: "", writers: [], stars: [], trailer: ""
                }
                $('.title_wrapper').filter(function () {
                    var data = $(this);
                    title = data.children().first().text();
                    title = title.substr(0, (title.indexOf('(') - 1));
                    json.title = title;
                });
                $('.title_wrapper').filter(function () {
                    var data = $(this);
                    year = data.children().first().children().first().text();
                    year = year.substr(1, (year.length - 2));
                    year = parseInt(year);
                    json.year = year;
                });
                $('.subtext').filter(function () {
                    var data = $(this);
                    runtime = data.children().first().next().next().text();
                    runtime = runtime.trim();
                    json.runtime = runtime;
                });
                $('.subtext').filter(function () {
                    var data = $(this);
                    data.children().each(function(i, elem){
                        if($(this).children().hasClass('itemprop')){
                            genres.push($(this).text());
                        }
                    });
                    json.genres = genres;
                });
                $('.poster').filter(function () {
                    var data = $(this);
                    poster = data.children().first().children().first().attr('src');
                    json.poster = poster;
                });
                $('.ratingValue').filter(function () {
                    var data = $(this);
                    userRating = data.children().first().children().first().text();
                    userRating = parseFloat(userRating);
                    json.userRating = userRating;
                });
                $('.metacriticScore').filter(function () {
                    var data = $(this);
                    metaScore = data.children().first().text();
                    metaScore = parseInt(metaScore);
                    json.metaScore = metaScore;
                });
                $('.summary_text').filter(function () {
                    var data = $(this);
                    synopsis = data.text();
                    synopsis = synopsis.trim();
                    json.synopsis = synopsis;
                });
                $('.plot_summary').filter(function () {
                    var data = $(this);
                    director = data.children().first().next().children().first().next().children()
                    .first().children().first().text()
                    json.director = director;
                });
                $('.plot_summary').filter(function () {
                    var data = $(this);
                    data.children().first().next().next().children().each(function(i, elem){
                        if($(this).children().length > 0){
                            writers.push($(this).children().text());
                        }
                    });
                    json.writers = writers;
                });
                $('.plot_summary').filter(function () {
                    var data = $(this);
                    data.children().first().next().next().next().children().each(function(i, elem){
                        if($(this).children().length > 0){
                            stars.push($(this).children().text());
                        }
                    });
                    json.stars = stars;
                });
                $('.slate').filter(function () {
                    var data = $(this);
                    trailer = data.children().first().attr('href');
                    if(trailer != ''){
                        trailer = "http://www.imdb.com" + trailer;
                    }
                    json.trailer = trailer;
                });
                
                resolve(json);
            }
            else {
                reject(error);
            }
        });
    });
}