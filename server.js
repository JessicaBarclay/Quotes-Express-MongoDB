const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://jessicabarclay:pass@ds123614.mlab.com:23614/quotes', (err, database) => {
	if (err) return console.log(err);
	db = database;
	app.listen(3000, () => {
		console.log('listening on port 3000')
	});
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray(function(err, result) {
		if (err) return console.console.log(err);
		res.render('index.ejs', {quotes: result})
	});
});

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body ,(err, results) => {
		if (err) return console.log(err);

		console.log('saved to the database');
		res.redirect('/');
	});
});
