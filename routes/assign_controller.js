var Database = require('../models/mymongo.js'),
	Assign = require('../models/assign.js'),
	this_user = require('../models/auth').this_user

exports.asgnExisting = function(req, res){
    console.log("asgnExisting");
    console.log("req.body.chore_type: ", req.body.chore_type);
    if (req.body.chore_type == "onetime"){
        var newAssign = {
            chore_name: req.body.chore_name,
            user_name: req.body.assignee,
            due_date: req.body.due_date
        };
        Database.insert(
            "housemates",
            "assigns",
            newAssign,
            function(model) {
                res.redirect('chores');
            }
        );
    } else if (req.body.chore_type == "repeating"){
        start_date = new Date(req.body.due_date);
        on_date = new Date(req.body.due_date);    
        end_date = new Date(req.body.end_date);
        dates = [start_date];
        rate = Number(req.body.rate);

        incrementDate(on_date, req.body.rate_frequency, rate);

        while (on_date <= end_date){
            console.log("ON DATE..", on_date);
            push_date = new Date(on_date);
            dates.push(push_date);
            incrementDate(on_date, req.body.rate_frequency, rate);
        }
        console.log("DATES ARRAY..", dates);

        dates.forEach(function(date){
            var newAssign = {
                chore_name: req.body.chore_name,
                user_name: req.body.assignee,
                due_date: date
            };
            Database.insert(
                "housemates",
                "assigns",
                newAssign,
                function(model) {
                    
                }
            );
        });
        
        res.redirect('chores');
    } else { //rotating
        
    }
};

function incrementDate(date, rate_frequency, rate){
    if (rate_frequency == "daily"){
        var x = date.getDate()+rate;
        date.setDate(x);
        console.log("DATE IS....", date);
        
    } else if (rate_frequency == "weekly"){
        xrate = rate*7
        var x = date.getDate()+xrate;
        date.setDate(x);
        console.log("DATE IS....", date);

    } else if (rate_frequency == "monthly"){
        var x = date.getMonth()+rate;
        date.setMonth(x);
        console.log("DATE IS....", date);

    } /*else { //yearly 
        var x = date.getFullYear()+rate;
        date.setFullYear(x);
        console.log("DATE IS....", date);

    }*/
    return date;
}

exports.getAssignments = function(req,res){
    console.log("GETTING ALL Assigments..");
    var data = {
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