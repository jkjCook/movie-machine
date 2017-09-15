angular.module("myApp").directive("movieDirective", function () {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/movie.html'
    }
})