
var express = require('express');
var request = require('request');
var ejs = require('ejs');

var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', function(req, res){	
	var query = req.query.search;	
	var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render('results', {data: data});
		};
	});
});

app.listen(process.env.PORT || 5000, function(){
	console.log('works');
});
