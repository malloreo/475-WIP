var chores = require("../models/mymongo.js");

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
			res.render('make', {
				chore_name : newChore.chore_name,
				user : newChore.user,
				due_date: newChore.due_date
			});
		}
    );
    console.log(chores[0]); //returns undefined
}
