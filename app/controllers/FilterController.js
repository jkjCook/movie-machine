angular.module('myApp').controller("FilterController", ["addFilters", function($scope, addFilters){
    $scope.genre;
    $scope.start;
    $scope.end;
    $scope.minscore;
    $scope.starring;

    $scope.filter = function(){
        addFilters.getFilters().then((response) =>{
            console.log(response.data);
        });
    }
}])