var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        controller: 'HomeController',
        templateUrl: 'public/views/homeView.html' 
    }).when('/search', {
        controller: 'MovieController',
        templateUrl: 'public/views/searchView.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});