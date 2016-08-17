var port = 1337;

// Set up db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect("mongodb://localhost/test");


// var CountSchema = new Schema({
//   number: {
//     type: Number,
//     default: 0
//   }
// });

var DrinkSchema = new Schema({
	flavor: {
		type: String,
		default: "Delicious"
	},
	createdOn: {
		type: Date,
		default: Date.now()
	}
})

// var Count = mongoose.model('count', CountSchema);

var Drink = mongoose.model('drink', DrinkSchema);

var express = require('express');

var app = express();

/**
* Params: timeNow is a date object
**/
var getCurrentDay = function(timeNow) {
	var date = timeNow.getDate();
	var month = timeNow.getMonth();
	var year = timeNow.getFullYear();

	var startDate = new Date(year, month, date, 0, 0, 0, 0);

	return startDate;
}

// Start of week is at beginning of sunday
var getCurrentWeek = function(timeNow) {
	var day = timeNow.getDay();
	var date = timeNow.getDate();
	var month = timeNow.getMonth();
	var year = timeNow.getFullYear();

	var curDate = new Date(year, month, date, 0, 0, 0, 0);
	var startDate = curDate - day*86400000;
	
	return startDate;
}

var getCurrentMonth = function(timeNow) {
	var month = timeNow.getMonth();
	var year = timeNow.getFullYear();

	var startDate = new Date(year, month, 0, 0, 0, 0, 0);

	return startDate;
}

var getCurrentYear = function(timeNow) {
	var year = timeNow.getFullYear();

	var startDate = new Date(year, 0, 0, 0, 0, 0, 0);

	return startDate;
}

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

// app.get('/count', function (req, res, next) {
//   Count.findOne({}, function (err, count) {
//     if (err) return res.status(500).text("Mongo error");
//     if (!count) {
//       var newCount = new Count();
//       newCount.save(function (err, count) {
//         res.json({number: count.number});
//       });
//     } else {
//       res.json({number: count.number});
//     }
//   });
// });

// app.post('/count', function (req, res, next) {
//   // next();
// });


app.get('/count', function (req, res, next) {
	var now = new Date();
	var date = getCurrentDay(now);
	var week = getCurrentWeek(now);
	var month = getCurrentMonth(now);
	var year = getCurrentYear(now);

	var numDay = 0;
	var numWeek = 0;
	var numMonth = 0;
	var numYear = 0;
	var numAll = 0;

	Drink.count({'createdOn': {$gt : date}}, function(err, count) {
		if (err) return res.status(500).text("Mongo error");
		if (!count) {
			var newDrink = new Drink();
			newDrink.save(function (err, count) {
				// res.json({number})
			})
		} else {
			numDay = count;
		}
	});

	Drink.count({'createdOn': {$gt : week}}, function(err, count) {
		if (err) return res.status(500).text("Mongo error");
		if (!count) {
			var newDrink = new Drink();
			newDrink.save(function (err, count) {
				// res.json({number})
			})
		} else {
			numWeek = count;
		}
	});

	Drink.count({'createdOn': {$gt : month}}, function(err, count) {
		if (err) return res.status(500).text("Mongo error");
		if (!count) {
			var newDrink = new Drink();
			newDrink.save(function (err, count) {
				// res.json({number})
			})
		} else {
			numMonth = count;
		}
	});

	Drink.count({'createdOn': {$gt : year}}, function(err, count) {
		if (err) return res.status(500).text("Mongo error");
		if (!count) {
			var newDrink = new Drink();
			newDrink.save(function (err, count) {
				// res.json({number})
			})
		} else {
			numYear = count;
		}
	});

	Drink.count({}, function(err, count) {
		if (err) return res.status(500).text("Mongo error");
		if (!count) {
			var newDrink = new Drink();
			newDrink.save(function (err, count) {
				
			})
		} else {
			numAll = count;
		}
	});

	res.json({day: numDay, week: numWeek, month: numMonth, year: numYear, all: numAll});

	// Get current day, week, month, year
	// find the number of items in those regions
	// get counts
	// return counts in json
})

app.post('/count', function (req, res, next) {
	// Add item to model
	var newDrink = new Drink();
	newDrink.save(function (err, count) {
		res.send("ok");
	})
	// res.status(200).send("yup");
})

app.use(function (req, res, next) { 
  res.status(404).send("404 Error, sorry folks");
})

// Start!
app.listen(port);

console.log("Howdy! There's a server running at http://localhost:" + port);