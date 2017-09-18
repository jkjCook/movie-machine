angular.module('myApp').factory('getMovie', ['$http', function ($http) {

    var factory = {};
    factory.getMovieById = function (id) {
        var URL = 'http://mov-api.herokuapp.com/movie/' + id;
        return $http.get(URL);
    }

    factory.getRandomMovie = function () {
        var URL = 'http://movie-machine.herokuapp.com/random';
        return $http.get(URL);
    }

    return factory;
}]);