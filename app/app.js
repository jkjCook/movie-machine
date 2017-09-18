var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        controller: 'HomeController',
        templateUrl: 'public/views/homeView.html' 
    }).when('/scrape', {
        controller: 'MovieController',
        templateUrl: 'public/views/scrapeView.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});