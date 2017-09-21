angular.module('myApp').controller("HomeController", ["$scope", "getMovie", "$compile", "$sce", function ($scope,
    getMovie, $compile, $sce) {

    $scope.genre;
    $scope.start;
    $scope.end;
    $scope.rating;
    $scope.starring;
    $scope.iframe;
    $scope.barvalue;

    $scope.showIframe = function () {
        if ($scope.iframe) {
            angular.element(document.getElementById("trailer").style.display = "block");
        }
        else {
            angular.element(document.getElementById("trailer").style.display = "none");
        }
    }

    $scope.noMatchingMovie = function () {
        $scope.call();
        $('#e-message').append('<div class="alert alert-danger"><strong>No movies match this filter!</strong></div>');
    }
    $scope.getRating = function () {
        $scope.barvalue = $scope.movieData.userRating * 10;
        angular.element(document.getElementById('prog'))[0].style.width = $scope.barvalue + '%';

        if ($scope.movieData.userRating < 4) {
            angular.element(document.getElementById("prog"))[0].style.background = "red";
        }
        else if ($scope.movieData.userRating < 6) {
            angular.element(document.getElementById("prog"))[0].style.background = '#e3e300';
        }
        else {
            angular.element(document.getElementById("prog"))[0].style.background = 'green';
        }
    }
    $scope.filterMovies = function () {

        if ($scope.start && !$scope.end) {
            var dt = new Date;
            $scope.end = dt.getYear() + 1900;
        }
        $('#e-message').empty();
        getMovie.filterMovies($scope.genre, $scope.start, $scope.end, $scope.starring, $scope.rating).then((response) => {
            $scope.movieData = response.data[0];
            if (!response.data) {
                $scope.noMatchingMovie();
            }
            if ($scope.movieData.trailer == "N/A") {
                $scope.movieData.trailer = "";
                $scope.iframe = "";
            }
            else {
                $scope.iframe = $sce.trustAsResourceUrl($scope.movieData.trailer);
            }
            $scope.getRating();
            $scope.showIframe();
        });
    }

    $scope.call = function () {
        getMovie.getRandomMovie().then((response) => {
            $scope.movieData = response.data;
            if ($scope.movieData.trailer == "N/A") {
                $scope.movieData.trailer = "";
                $scope.iframe = "";
            }
            else {
                $scope.iframe = $sce.trustAsResourceUrl($scope.movieData.trailer);
            }
            $scope.getRating();
            $scope.showIframe();
        })
    }
    $scope.call();
}]);

