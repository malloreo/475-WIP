var Database = require('../models/mymongo.js');
var Assign = require('../models/assign.js');

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