var Assign = require('../models/assign.js');

exports.post = function(req, res){
    console.log("--- REQ.BODY.CHORE_NAME: ", req.body.chore_name,+" ---");
    console.log("--- REQ.BODY.description: ", req.body.description,+" ---");
    new Assign({
        user_id://req.body.chore_name,
        chore_id:req.body.description,
        
        completed:false
    }).save();
    res.redirect('assign_add');
};