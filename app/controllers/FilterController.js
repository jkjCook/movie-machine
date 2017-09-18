angular.module('myApp').controller("FilterController", [ "$scope", "filterMovie", function($scope, filterMovie){
    $scope.genre;
    $scope.start;
    $scope.end;
    $scope.minscore;
    $scope.starring;
   
    $scope.filterMovies = function(){
        
        filterMovie.filterMovies($scope.genre, $scope.start, $scope.end, $scope.starring).then((response) =>{
            console.log(response.data);
        });
    }
}])