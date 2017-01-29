window.onload = function() {
  console.log("window loaded");
  var omdbBtn = document.getElementById('omdb-search-btn');
  var omdbForm = document.getElementById('omdb-form');
  var omdb = 'http://www.omdbapi.com/?s=';

  omdbForm.addEventListener('submit', function(e){
    e.preventDefault();
    var title = document.getElementById('omdb-search').value;
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
        console.log("search results: ", data);
      }
    })
  });

}
