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

var Chore = require('../models/chore.js');
var Assign = require('../models/assign.js');
var User = require('../user.js')
this_user = require('../models/auth').this_user
exports.post = function(req, res){
    new Chore({
        chore_name:req.body.chore_name,
        description:req.body.description,
        active:true
    }).save(function(err,House){
        User.where({
            'local.email':this_user.email, 
            'local.firstname':this_user.first_name,
            'local.lastname':this_user.last_name
        }).findOne( function(err,obj) {
            new Assign({
                chore_id:Chore._id,
                user_id:obj.id
            }).save();
            res.redirect('chore');
            })
    }); 
};