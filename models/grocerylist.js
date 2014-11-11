var mongoose = require('mongoose');

var grocerySchema = new mongoose.Schema({
	name      :String,
	quantity  :String,
	bought	  :String,
	obsolete  :String
});

module.exports = mongoose.model('grocery', grocerySchema);

