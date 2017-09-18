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

    return factory;
}]);