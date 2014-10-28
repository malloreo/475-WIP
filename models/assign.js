var mongoose = require('mongoose');

var assignSchema = new mongoose.Schema({
	chore_name   :String,
	user_name  :String
});

module.exports = mongoose.model('Assign', assignSchema);

