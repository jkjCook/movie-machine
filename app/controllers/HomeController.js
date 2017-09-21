angular.module('myApp').controller("HomeController", ["$scope", "getMovie", "$sce", function ($scope,
    getMovie, $sce) {

    $scope.genre;
    $scope.start;
    $scope.end;
    $scope.rating;
    $scope.starring;
    $scope.iframe;
    $scope.barvalue;


    $scope.displayFilters = function () {
        if ($scope.genre) {
            angular.element(document.getElementById("filtergenre").style.display = "block");
        }
        else {
            angular.element(document.getElementById("filtergenre").style.display = "none");
        }
        if ($scope.start) {
            angular.element(document.getElementById("filteryear").style.display = "block");
        }
        else {
            angular.element(document.getElementById("filteryear").style.display = "none");
        }
        if ($scope.rating) {
            angular.element(document.getElementById("filterrating").style.display = "block")
        }
        else {
            angular.element(document.getElementById("filterrating").style.display = "none")
        }
        if ($scope.starring) {
            angular.element(document.getElementById("filterstarring").style.display = "block")
        }
        else {
            angular.element(document.getElementById("filterstarring").style.display = "none")
        }
    }

    //Shows the trailer iframe when there is a trailer
    $scope.showIframe = function () {
        if ($scope.iframe) {
            angular.element(document.getElementById("trailer").style.display = "block");
        }
        else {
            angular.element(document.getElementById("trailer").style.display = "none");
        }
    }
    //When no movie matches displays error message
    $scope.noMatchingMovie = function () {
        $scope.call();
        $('#e-message').append('<div class="alert alert-danger"><strong>No movies match this filter!');
    }
    $scope.getRating = function () {
        //Change width of prog bar for metacritic score and imbd score 
        $scope.barvalue = $scope.movieData.userRating * 10;
        angular.element(document.getElementById('imdbprog'))[0].style.width = $scope.barvalue + '%';
        angular.element(document.getElementById('metaprog'))[0].style.width = $scope.movieData.metaScore + '%';

        //Decide on color of the bars based on score
        if ($scope.movieData.metaScore > 0) {
            angular.element(document.getElementById("metabar").style.display = "block");
        }
        else {
            angular.element(document.getElementById("metabar").style.display = "none");
        }
        if ($scope.movieData.userRating < 4) {
            angular.element(document.getElementById("imdbprog"))[0].style.background = "red";
        }
        else if ($scope.movieData.userRating < 6) {
            angular.element(document.getElementById("imdbprog"))[0].style.background = '#e3e300';
        }
        else {
            angular.element(document.getElementById("imdbprog"))[0].style.background = 'green';
        }
        if ($scope.movieData.metaScore < 40) {
            angular.element(document.getElementById("metaprog"))[0].style.background = "red";
        }
        else if ($scope.movieData.metaScore < 60) {
            angular.element(document.getElementById("metaprog"))[0].style.background = '#e3e300';
        }
        else {
            angular.element(document.getElementById("metaprog"))[0].style.background = 'green';
        }
    }
    //Sends the filter request from the input
    $scope.filterMovies = function () {
        $('#e-message').empty();
        if ($scope.start && !$scope.end) {
            var dt = new Date;
            $scope.end = dt.getYear() + 1900;
        }
        else if ($scope.end && !$scope.start) {
            $scope.start = 1900;
        }

        if (!$scope.genre && !$scope.start && !$scope.end && !$scope.starring && !$scope.rating) {
            $scope.call();
        }
        else {
            getMovie.filterMovies($scope.genre, $scope.start, $scope.end, $scope.starring, $scope.rating).then((response) => {
                var num = Math.floor(Math.random() * response.data.length);
                $scope.movieData = response.data[num];
                if (!$scope.movieData) {
                    $scope.noMatchingMovie();
                }
                else {
                    if ($scope.movieData.trailer == "N/A") {
                        $scope.movieData.trailer = "";
                        $scope.iframe = "";
                    }
                    else {
                        $scope.iframe = $sce.trustAsResourceUrl($scope.movieData.trailer);
                    }
                    $scope.getRating();
                    $scope.showIframe();
                    $scope.displayFilters();
                }

            });
        }
    }
    //Call for a random movie on refresh
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
            $scope.displayFilters();
        })
    }
    $scope.call();
}]);

