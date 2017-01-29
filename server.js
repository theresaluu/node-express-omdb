var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

//global middleware- each req runs through these prior to execution
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

//sets up ejs in place of Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index', {title: 'Movie Search', field: 'Movie Title Search'});
})
app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return
  }

  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/', function(req, res) {
  var search = req.body;
  res.json(search);
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
