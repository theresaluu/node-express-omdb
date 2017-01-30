//client-side JS
window.onload = function() {
  console.log("window loaded");
  var omdbBtn = document.getElementById('omdb-search-btn');
  var omdbForm = document.getElementById('omdb-form');
  var omdb = 'http://www.omdbapi.com/?s=';
  var movies = [];

  var indivMovieResult = function(movie){
    return '<a href="#" class="movie-link">' + movie.Title
      + '</a> <i class="fa fa-star-o" aria-hidden="true"></i> <p class= "hidden-details" id='
      + movie.imdbID + '> <img src=' + movie.Poster + ' alt=' +
      movie.Title.split(' ').join('_') + '> <br> Name: ' + movie.Title +
      '<br> Type: ' + movie.Type + '<br> Year: ' + movie.Year + '</p>';
  }

  var getDetails = function(movie) {
    return {}
  }

  var showMeTheMovies = function(data){
    var li = document.createElement('li');
    var movieList = document.querySelector('.movie-list');
    var movieHtml = indivMovieResult(data);
    li.innerHTML = movieHtml;
    movieList.insertBefore(li, movieList.firstChild);
  };

  var makeMovieList = function() {
    document.querySelector('.movie-list').innerHTML= "";
    movies.forEach(function(movie) {
      showMeTheMovies(movie);
    });
  };
  omdbForm.addEventListener('submit', function(e){
    e.preventDefault();

    //grabs user entry for ajax search
    var title = document.getElementById('omdb-search').value;
    document.getElementById('omdb-search').value = '';

    //formats url for post
    var omdbSearchTerm = omdb + title.split(" ").join('+');

    fetch(omdbSearchTerm, {
      method: 'post'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if(data.Error) {
        console.log(data["Error"]);
      } else {
        movies = data['Search'];
        makeMovieList();
        console.log("search results: ", data['Search']);
        console.log("search results length: ", data["Search"].length);
      }
    })

  });

  //event listener to dynamic links by setting it on parent ul element
  document.querySelector('.movie-list')
          .addEventListener('click', function(event) {
            var movieDetails = event.target.nextSibling.nextElementSibling.nextElementSibling;
            var star = event.target;

            if(event.target.tagName.toLowerCase() === 'a') {
              console.log('clicked a href');
              console.log(movieDetails.className=== 'hidden-details');
              if(movieDetails.className === "hidden-details") {
                movieDetails.className = "";
              } else {
                console.log('should be changing');
                movieDetails.className = "hidden-details";
              }
            }
            if(event.target.tagName.toLowerCase() === 'i') {
              if(star.className === "fa fa-star-o") {
                star.className = "fa fa-star";
              } else {
                star.className = "fa fa-star-o";
              }
            }
          });
}
