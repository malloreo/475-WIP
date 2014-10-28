var mongoose = require('mongoose');

var choreSchema = new mongoose.Schema({
	chore_name   :String,
	description  :String,
	due_date	 :Date,
	active       :Boolean
});

module.exports = mongoose.model('Chore', choreSchema);

