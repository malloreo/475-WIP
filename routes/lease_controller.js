var Database = require("../models/mymongo.js");
var House = require('../models/house.js');
var Lease = require('../models/lease.js');
var User = require('../user.js')
this_user = require('../models/auth').this_user

exports.this_user_house = function(req, res){
	lease_query = { user_id: this_user.uid.toString() };
	Database.find(
	    "housemates", "leases", lease_query,
	    function(model){
	      house_id = model[0].house_id;
	      console.log("house_id...", house_id);
	  });
}