var mongoose = require('mongoose');

var assignSchema = new mongoose.Schema({
	chore_name   :String,
	user_name  :String,
	due_date	:Date
});

module.exports = mongoose.model('Assign', assignSchema);

