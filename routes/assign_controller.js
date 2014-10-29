var Database = require('../models/mymongo.js'),
	Assign = require('../models/assign.js'),
	this_user = require('../models/auth').this_user

exports.asgnExisting = function(req, res){
    var newAssign = {
        chore_name: req.body.chore_name,
        user_name: req.body.assignee
    };
    Database.insert(
        "housemates",
        "assigns",
        newAssign,
        function(model) {
            res.redirect('chores');
        }
    );
};

exports.getAssignments = function(req,res){
    console.log("GETTING ALL Assigments..");
    data = {
        my_assignments : [],
        their_assignments : []
    };
    my_name = this_user.first_name + " " + this_user.last_name
    Database.find("housemates","assigns","", function(model){
        model.forEach(function(assign){
            if (assign.user_name == my_name){
               data["my_assignments"].push(assign)
            } else{
                data["their_assignments"].push(assign)
            }
            // data.push(chore.chore_name);
        })
        res.send(data)
    })
}