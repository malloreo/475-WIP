var Database = require('../models/mymongo.js'),
	Assign = require('../models/assign.js'),
	this_user = require('../models/auth').this_user,
    ObjectId = require('mongodb').ObjectID;


exports.asgnExisting = function(req, res){
    console.log("asgnExisting");
    console.log("req.body.chore_type: ", req.body.chore_type);
    if (req.body.chore_type == "onetime"){
        var newAssign = {
            chore_name: req.body.chore_name,
            user_name: req.body.assignee,
            due_date: req.body.due_date,
            completed: false
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
            push_date = new Date(on_date);
            dates.push(push_date);
            incrementDate(on_date, req.body.rate_frequency, rate);
        }

        dates.forEach(function(date){
            var newAssign = {
                chore_name: req.body.chore_name,
                user_name: req.body.assignee,
                due_date: date,
                completed: false
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
        start_date = new Date(req.body.due_date);
        on_date = new Date(req.body.due_date);    
        end_date = new Date(req.body.end_date);
        dates = [start_date];
        rate = Number(req.body.rate);
        members = this_user.members;

        //find which index the assignee is
        on_member = members.indexOf(req.body.assignee);
        console.log("---starting on_member: ", on_member);
        rotation = [on_member];

        incrementDate(on_date, req.body.rate_frequency, rate);

        while (on_date <= end_date){
            push_date = new Date(on_date);
            dates.push(push_date);
            incrementDate(on_date, req.body.rate_frequency, rate);
        }

        for (var i=0; i<dates.length; i++){
            if (on_member == this_user.members.length-1){
                on_member = 0;
            } else {
                on_member += 1;
            }
            push_index = on_member;
            rotation.push(push_index);
        }
        console.log("ROTATION: ", rotation);

        dates.forEach(function(date){
            console.log("...on member...", on_member);

            var newAssign = {
                chore_name: req.body.chore_name,
                user_name: members[rotation[dates.indexOf(date)]],
                due_date: date,
                completed: false
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

exports.completeChore = function(req, res){
    console.log("ID IS: ", req.params.id);
    id = req.params.id;
    console.log("ID IS OF TYPE: ", typeof(id))
    // Assign.findByIdAndUpdate(id, { completed: true }, function(err, docs){
    //     if(err){
    //         console.log("ERROR COMPLETING CHORE");
    //         res.json(err);
    //     }else{
    //         // req.params.id
    //         console.log("docs: ",docs);
    //         res.redirect('chores');
    //     }
    // })

    Assign.findById(id, function (err, doc) {
      if (err) {
        console.log("id is: ", id);
        console.log("typeof(id) is: ", typeof(id));
        return console.log("err:", err);
      } else {
        console.log("id is: ", id);
        console.log("typeof(id) is: ", typeof(id));
        console.log("DOC FOUND:", doc);
        doc.completed = true;
        doc.save();
        res.redirect('chores');
      }
      
    })
};