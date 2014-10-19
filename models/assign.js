var mongoose = require('mongoose');

var assignSchema = new mongoose.Schema({
	chore_id   :String,
	user_id  :String
});

module.exports = mongoose.model('Assign', assignSchema);

