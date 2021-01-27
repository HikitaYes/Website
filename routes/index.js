var express = require('express');
var mongoose = require('mongoose')
var json = require('json');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect("mongodb+srv://hikita:yess@cluster0.9kuvl.mongodb.net/db?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log('Database connect'))
.catch(err => console.log(err));


var bookingSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	phonenumber: {
		type: String,
		require: true,	
	},
	table: {
		type: String,
		require: true,
	}
});

var Booking = mongoose.model('Booking', bookingSchema);


router.get('', function(req, res, next) {
  	res.render('home.hbs', { layout: 'layout_home' });
});

router.get('/menu', function(req, res, next) {
  	res.render('menu.hbs', { layout: 'layout_menu' });
});

router.get('/booking', function(req, res, next) {
	res.render('booking.hbs', { layout: 'layout_booking' });
});

router.get('/about', function(req, res, next) {
	res.render('about.hbs', { layout: 'layout_about' });
});

router.post('', urlencodedParser, function(req, res, next) {
	
	Booking.find({ table: req.body.table }, function(err, docs) {
		if (!Object.keys(docs).length == 0) {
			res.render('booking.hbs', { layout: 'layout_booking', message: `${req.body.table} уже забронирован` });
		}
		else {
			Booking.create({
				name: req.body.name,
				phonenumber: req.body.phonenumber,
				table: req.body.table,
			})
			.then(booking => console.log(booking))
			.catch(err => res.send(err));
			res.render('booking.hbs', { layout: 'layout_booking', success: `${req.body.table} успешно забронирован` });
		}
	});
});

module.exports = router;
