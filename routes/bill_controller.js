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
	if (req.body.type = "equal_all"){
		//splitting equally with everyone in house
		//adds pay for split amount to everyone but the "user_name"
		new Bill({
			bill_name: req.body.bill_name,
			amount: amount,
			date: req.body.date,
			user_name: req.body.user_name,
			obsolete:"1",
			active:true
		}).save(function(err,House){
			split = req.body.payer.length
			for (var i=0; i<split; i++){
				some_payer = req.body.payer[i];
				if (some_payer != req.body.user_name){
					//if person who paid is included on charge, don't make Pay for that person
					new Pay({
						bill_name: req.body.bill_name,
						user_name: req.body.user_name,
						payer: some_payer,
						partial_amount: Number(amount / split).toFixed(2),
						date: req.body.date,
						obsolete:"1",
						completed: false
					}).save();
				}
			}
			
			res.redirect('bills');
		});
	}
};