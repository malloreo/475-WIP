var mongoose = require('mongoose');

var houseSchema = new mongoose.Schema({
	housename   :String,
	street      :String,
	zip         :String,
	city        :String,
	state       :String
});

module.exports = mongoose.model('House', houseSchema);

