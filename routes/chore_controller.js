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
        model.forEach(function(chore){
            data.push(chore.chore_name);
        })
        res.send(data)
    })
}

exports.addNew = function(req, res){
    console.log("REQ.BODY..", req.body);
    new Chore({
        chore_name:req.body.chore_name,
        description:req.body.description,
        due_date:req.body.due_date,
        active:true
    }).save(function(err,House){
        name = req.body.assignee.split(" ");
        first_name = name[0];
        last_name = name[1];
        User.where({
            'local.firstname':first_name,
            'local.lastname':last_name
        }).findOne( function(err,obj) {
            new Assign({
                chore_id:Chore._id,
                user_id:obj.id
            }).save();
            res.redirect('chores');
            })
    }); 
};


//for when user_ids are what we search by...
// exports.post = function(req, res){
//     console.log("REQ.BODY..", req.body);
//     new Chore({
//         chore_name:req.body.chore_name,
//         description:req.body.description,
//         due_date:req.body.due_date,
//         active:true
//     }).save(function(err,House){
//         name = req.body.assignee.split(" ");
//         first_name = name[0];
//         last_name = name[1];
//         User.where({
//             'local.firstname':first_name,
//             'local.lastname':last_name
//         }).findOne( function(err,obj) {
//             new Assign({
//                 chore_id:Chore._id,
//                 user_id:obj.id
//             }).save();
//             res.redirect('chores');
//             })
//     }); 
// };