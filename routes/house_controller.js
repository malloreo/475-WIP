var 
House = require('../models/house.js');

exports.post = function(req, res){
	new House({
		housename:req.body.housename,
		street:req.body.street,
		zip:req.body.zip,
		city:req.body.city,
		state:req.body.state
	}).save();
	res.redirect('dashboard');
};

// exports.list = function(req, res){
// 	House.find(function(err,house) {
// 		res.send(house);
// 	});
// }
