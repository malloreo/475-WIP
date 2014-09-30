var util = require("util");
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://localhost:27017/";

//db/:collection/:operation/:document
var doError = function (e) {
	util.debug("ERROR: "+e);
	throw new Error(e);
	}

// INSERT
exports.insert = function(database, collection, query, callback) {
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
    db.collection(collection).insert(query, {safe:true}, function(err, crsr) {
      callback(crsr);
  		});
  	});
  }
				
// FIND
exports.find = function(database, collection, query, callback) {
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
    var crsr = db.collection(collection).find(query);
      crsr.toArray(function(err, docs) {
        if (err) doError(err);
        callback(docs);
        });
  		});
  	}

// UPDATE
exports.update = function(database, collection, query, callback) {
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
    db.collection(collection).update(query.find,
                                      query.update, 
                                      {new:true}, 
                                      function(err, crsr) {
                                        if (err) doError(err);
                                        callback('Update succeeded');
                                      });
  	});
  }

//DELETE
exports.remove = function(database, collection, query, callback) {
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
    db.collection(collection).remove(query, function(){});
    });
  }
