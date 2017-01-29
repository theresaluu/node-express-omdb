window.onload = function() {
  console.log("window loaded");
  var omdbBtn = document.getElementById('omdb-search-btn');
  var omdbForm = document.getElementById('omdb-form');
  var omdb = 'http://www.omdbapi.com/?s=';

  var getValues = function(){
    var searchTerm = document.getElementById('omdb-search').value;

    document.getElementById('omdb-search').value = '';

    return;
  }

  omdbForm.addEventListener('submit', function(e){
    e.preventDefault();
    var title = document.getElementById('omdb-search').value;
    var omdbSearchTerm = omdb + title.split(" ").join('+');
    console.log(omdbSearchTerm);
    var values = getValues();
    console.log(JSON.stringify(values));
    fetch(omdbSearchTerm, {
      method: 'post',
      body: JSON.stringify(values)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("search results: ", data)
    })
  });

}
