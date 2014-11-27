// var Chore = require('../models/chore.js');

// exports.post = function(req, res){
//     console.log("--- REQ.BODY.CHORE_NAME: ", req.body.chore_name,+" ---");
//     console.log("--- REQ.BODY.description: ", req.body.description,+" ---");
//     new Chore({
//         chore_name:req.body.chore_name,
//         description:req.body.description,
//         active:true
//     }).save();
//     res.redirect('assign_add');
// };
var Database = require('../models/mymongo.js');
var Chore = require('../models/chore.js');
var Assign = require('../models/assign.js');
var User = require('../user.js')
this_user = require('../models/auth').this_user

exports.getAllChores = function(req, res){
    console.log("GETTING ALL CHORES..");
    data = [];
    Database.find("housemates","chores","", function(model){
        // model.forEach(function(chore){
        //     data.push(chore.chore_name);
        // })
        // res.send(data)
        res.send(model)
    })
}

exports.addNew = function(req, res){
        console.log("adding chore");
    new Chore({
        chore_name:req.body.chore_name,
        active:true
    }).save(function(err,House){
        if (req.body.chore_type == "onetime"){
            console.log("let me tell you one time");
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
            console.log("repeating");
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
            console.log("rotating");
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
    }); 
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

