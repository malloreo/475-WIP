var mongoose = require('mongoose');

var assignSchema = new mongoose.Schema({
	chore_name   :String,
	user_name  :String,
	due_date	:Date,
	completed	:Boolean
});

module.exports = mongoose.model('Assign', assignSchema);

