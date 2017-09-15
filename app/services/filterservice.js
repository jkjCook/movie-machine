angular.module('myApp').factory('Filter', function () {
    return {
        yearstart: '',
        yearend: '',
        genre: '',
        keyword: '',
        score: '',
    };
})
angular.module('myApp').filter('moviefilter', function(){
    return function(input, yearstart, yearend, genre, score){
    var out = [];
    angular.forEach(input, function(movie){
      if((movie.year >= yearstart && movie.year <= yearend) && (movie.genre[0] == genre || movie.genre[1] == genre ||
      movie.genre[2] == genre) && (movie.score >= score)){
        out.push(movie);
      }
    })
    return out.title;
  }
})