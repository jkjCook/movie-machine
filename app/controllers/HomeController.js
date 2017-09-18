angular.module('myApp').controller("HomeController", ["$scope", "getMovie", function ($scope, getMovie) {
    $scope.URL;
    $scope.movieData;
    $scope.call = function () {
        getMovie.getRandomMovie().then((response) => {
            $scope.movieData = response.data;
            if ($scope.movieData.userRating < 4) {
                angular.element(document.getElementById("scoreid").style.background = "red");
            }
            if ($scope.movieData.userRating < 6) {
                angular.element(document.getElementById("scoreid").style.background = '#e3e300');
            }
            else {
                angular.element(document.getElementById("scoreid").style.background = 'green');
            }
        })
    }
    $scope.call();

}]);

