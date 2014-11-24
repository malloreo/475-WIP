var mongoose = require('mongoose');

var choreSchema = new mongoose.Schema({
	chore_name   :String,
	active       :Boolean
});

module.exports = mongoose.model('Chore', choreSchema);

