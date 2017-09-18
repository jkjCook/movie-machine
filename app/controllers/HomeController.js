angular.module('myApp').controller("HomeController", ["$scope", "getMovie", function ($scope, getMovie) {
    $scope.URL;
    $scope.movieData;
    $scope.call = function() {
        getMovie.getRandomMovie().then((response) => {
            $scope.movieData = response;
        })
    }
}]).directive("badgeColor", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            if (scope.score < 40) {
                angular.element(document.getElementById("scoreid").style.background = "red");
            }
            if (scope.score < 60) {
                angular.element(document.getElementById("scoreid").style.background = '#e3e300');
            }
            else {
                angular.element(document.getElementById("scoreid").style.background = 'green');
            }
        }
    }
})


