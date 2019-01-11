
var express = require('express');
var app = express();
app.use(express.static("public"));

// for making http requests with javascript
var request = require('request');

// for making templates
var ejs = require('ejs');
// for not having to write .ejs every time
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	// search has been inputted and stored in the search.ejs file, whose form tag then called the /results url and passed it here
	var query = req.query.search;
	// put it into the actual api search url and store that in a variable
	var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';
	// call the api with url, which contains the link with the search term
	request(url, function(error, response, body){
		// not mandatory, but good to have in case of error
		if(!error && response.statusCode == 200){
			// JSON.parse is converts the responding string (of JSON) into actual JSON
			var data = JSON.parse(body);
			// return the template results.ejs, passing the data on to it
			res.render('results', {data: data});

			// or directly return the entire json data:
			// res.send(data);
			// or specify it further:
			//res.send(data.Search[0].Title);
		};
	});
});

app.listen(process.env.PORT || 5000, function(){
	console.log('works');
});


// General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 
// Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 