angular.module('myApp').controller("HomeController", function ($scope, Filter) {

    $scope.filterdata = Filter;

    $scope.movies = [{
        poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTUxNzYyMjg2N15BMl5BanBnXkFtZTcwMTExNzExNw@@._V1_UX182_CR0,0,182,268_AL_.jpg',
        title: 'Cabin In The Woods',
        releasedate: '20110413T00:00:00',
        runtime: '1h 35m',
        director: 'Drew Goddard',
        score: 70,
        bio: 'Five friends go for a break at a remote cabin, where they get more than they bargained for, discovering the truth behind the cabin in the woods.',
        leadroles: ['Bobby Shmurda', 'Tom Cruise', 'Tom Cruise'],
        genres: ['Horror', 'Thriller', ]
    }, {
        poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI4MTYwMzQyOV5BMl5BanBnXkFtZTcwMTg4NDk0NA@@._V1_SY1000_SX675_AL_.jpg',
        title: 'Scream 4',
        releasedate: '20110415T00:00:00',
        runtime: '1h 51m',
        director: 'Wes Craven',
        score: 62,
        bio: 'Ten years have passed, and Sidney Prescott, who has put herself back together thanks in part to her writing, is visited by the Ghostface Killer.',
        leadroles: ['Neve Campbell', 'Courtney Cox', 'Lucy Hale'],
        genre: ['Horror', 'Thriller']
    }, {
        poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyODg5Njc4N15BMl5BanBnXkFtZTgwMzExMjE3NzE@._V1_SY1000_SX686_AL_.jpg',
        title: 'Deadpool',
        releasedate: '20160210T00:00:00',
        runtime: '1h 48m',
        director: 'Tim Miller',
        score: 80,
        bio: 'A fast-talking mercenary with a morbid sense of humor is subjected to a rogue experiment that leaves him with accelerated healing powers and a quest for revenge.',
        leadroles: ['Ryan Reynolds', 'Morena Baccarin', 'T.J Miller'],
        genre: ['Action', 'Adventure', 'Comedy']
    }, {
        poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
        title: 'Gladiator',
        releasedate: '20000512T00:00:00',
        runtime: '2h 35m',
        director: 'Ridley Scott',
        score: 85,
        bio: "When a Roman general is betrayed and his family murdered by an emperor's corrupt son, he comes to Rome as a gladiator to seek revenge.",
        leadroles: ['Russel Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
        genre: ''
    }
    ]

}).directive("badgeColor", function () {
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


