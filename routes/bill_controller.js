var Database = require('../models/mymongo.js');
var Bill = require('../models/bill.js');
var Pay = require('../models/pay.js');
var User = require('../user.js')
	this_user = require('../models/auth').this_user

exports.getAllBills = function(req, res) {
	console.log("GETTING ALL BILLS..");
	data = [];
	Database.find("housemates", "bills", "", function(model) {
		res.send(model)
	})
}

exports.addNew = function(req, res) {
	console.log("REQ.BODY..", req.body);
	amount = req.body.amount
	new Bill({
		bill_name: req.body.bill_name,
		description: req.body.description,
		amount: req.body.amount,
		date: req.body.date,
		user_name: req.body.user_name,
		obsolete:"1",
		active:true
	}).save(function(err,House){
		split = this_user.members.length
		console.log(split)
		new Pay({
			bill_name: req.body.bill_name,
			user_name: req.body.user_name,
			payer: req.body.payer,
			partial_amount: amount / split,
			obsolete:"1",
			active: true
		}).save();
		res.redirect('bills');
	});
};

exports.completeBill = function(req, res) {
	console.log("********");
	console.log(req.params.id);
	console.log("********");
	Bill.findByIdAndUpdate(
		{_id: req.params.id}, {active:false}, function(err, docs){
		if(err)
			res.json(err);
		else{
			req.params.id
			console.log(docs);
			res.redirect('bills');
		}
	});
}