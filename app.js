var express = require('express');

//Augmenter la taille de la police + photo

var app = express();

var PORT = 4600;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index');
});

app.listen(PORT, function() {
	console.log('Manue: http://localhost:' + PORT);
});
