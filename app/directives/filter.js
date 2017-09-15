angular.module("myApp").directive("filterDirective", function () {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/filter.html'
    }
})