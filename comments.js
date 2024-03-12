// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
var path = require('path');

// Create server
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server is running on http://%s:%s', host, port);
});

// Use public folder
app.use(express.static('public'));

// Use ejs
app.set('view engine', 'ejs');

// Get home page
app.get('/', function(req, res) {
	res.render('index');
});

// Get comments from file
app.get('/getComments', function(req, res) {
	fs.readFile('comments.json', 'utf8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			res.end(data);
		}
	});
});

// Post comments to file
app.post('/addComment', urlencodedParser, function(req, res) {
	fs.readFile('comments.json', 'utf8', function(err, data) {
		var comments = JSON.parse(data);
		comments.push(req.body);
		fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
			if (err) {
				console.log(err);
			}
		});
	});
	res.end();
});
