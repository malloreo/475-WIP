var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
	message		:String,
	author		:String,
	date		:Date
});

module.exports = mongoose.model('Chat', chatSchema);