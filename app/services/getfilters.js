angular.module('myApp').factory('addFilters', ['$http', function ($http) {

    var factory = {};
    factory.getFilters = function () {
        var URL = 'https://movie-machine.herokuapp.com/addfilter';
        return $http.get(URL);
    }

    return factory;
}]);