var chores = require("../models/mymongo.js"),
    this_user = require('../models/auth').this_user;

exports.addChore = function(req, res){
	var newChore = {
        chore_name: req.body.chore,
        user: req.body.user,
        due_date: req.body.due_date
    };

    chores.insert(
    	"housemates",
    	"chores",
    	newChore,
    	function(model) {
			res.render('chore', {
                user: this_user,
				chore_name : newChore.chore_name,
				chore_user : newChore.user,
				due_date: newChore.due_date
			});
		}
    );
    console.log(chores[0]); //returns undefined
}
