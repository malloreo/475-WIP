var mongoose = require('mongoose');

var paySchema = new mongoose.Schema({
	bill_name			:String,
	user_name			:String,
	payer				:String,
	partial_amount		:Number,
	obsolete			:String,
	active				:Boolean
});

module.exports = mongoose.model('Pay', paySchema);