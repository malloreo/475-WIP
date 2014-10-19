var mongoose = require('mongoose');

var leaseSchema = new mongoose.Schema({
	house_id   :String,
	user_id  :String
});

module.exports = mongoose.model('Lease', leaseSchema);

