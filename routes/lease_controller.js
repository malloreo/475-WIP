var Database = require("../models/mymongo.js");
var House = require('../models/house.js');
var Lease = require('../models/lease.js');
var User = require('../user.js')
this_user = require('../models/auth').this_user

exports.this_user_house = function(req, res){
	//called in /setupThisUser1
	lease_query = { user_id: this_user.uid.toString() };
	console.log("-leasequery-",lease_query);
	Database.find(
	    "housemates", "leases", lease_query,
	    function(model){
	    	console.log("MODEL..", model);
	    	houseID = model[0].house_id;
	    	console.log("house_id...", houseID);
	    	this_user.house_id = houseID;
	    	res.redirect('/setupThisUser2');
	});
}

exports.this_house_members_id = function(req, res){
	lease_query = { house_id: this_user.house_id.toString() };
	members_id = [];
	try {
	  	Database.find(
		  "housemates", "leases", lease_query,
		  function(model){
		    console.log("members model...", model);
		    model.forEach(function(lease){
		    	members_id.push(lease.user_id);
	    		// console.log("members_id...", members_id);
		  	});
	    	// res.redirect('/setupThisUser3');
		});
	} catch(error){
		console.log("There are no leases yet made.. do something about it if you care");
	}
}

exports.this_house_members_name = function(req, res){
	//doesn't work
	// lease_query = { house_id: this_user.house_id.toString() };
	// members_name = [];
  	// Database.find(
	  // "housemates", "leases", lease_query,
	  // function(model){
	  //   console.log("members model...", model);
	  //   model.forEach(function(lease){
	  //   	members_id.push(lease.user_id);
   //  		// console.log("members_id...", members_id);
   //  		res.redirect('/setupThisUser3');
	  // });
	// });
}