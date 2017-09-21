angular.module('myApp').factory('getMovie', ['$http', function ($http) {

    var factory = {};
    factory.getMovieById = function (id) {
        var URL = 'https://movie-machine.herokuapp.com/movie/' + id;
        return $http.get(URL);
    }

    factory.getRandomMovie = function () {
        var URL = 'https://movie-machine.herokuapp.com/random';
        return $http.get(URL);
    }
    factory.filterMovies = function(genre, start, end, starring){
        var URL = 'https://movie-machine.herokuapp.com/movies?';
        if(genre)
            URL += "genre=" + genre + "&";
        if(start || end)
            URL += "start=" + start + "&end=" + end + "&";
        if(starring)
            URL += "starring=" + starring; 
        return $http.get(URL);
    }
    return factory;
}]);