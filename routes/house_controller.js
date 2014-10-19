var House = require('../models/house.js');
var Lease = require('../models/lease.js');
var User = require('../user.js')
this_user = require('../models/auth').this_user
exports.post = function(req, res){
	new House({
		housename:req.body.housename,
		street:req.body.street,
		zip:req.body.zip,
		city:req.body.city,
		state:req.body.state
	}).save(function(err,House){
		User.where({
			'local.email':this_user.email, 
			'local.firstname':this_user.first_name,
			'local.lastname':this_user.last_name
		}).findOne( function(err,obj) {
			new Lease({
				house_id:House._id,
				user_id:obj.id
			}).save();
			res.redirect('dashboard');
			})
	});	
};



// var 
// House = require('../models/house.js');

// exports.post = function(req, res){
// 	new House({
// 		housename:req.body.housename,
// 		street:req.body.street,
// 		zip:req.body.zip,
// 		city:req.body.city,
// 		state:req.body.state
// 	}).save();
// 	res.redirect('dashboard');
// };

// // exports.list = function(req, res){
// // 	House.find(function(err,house) {
// // 		res.send(house);
// // 	});
// // }

