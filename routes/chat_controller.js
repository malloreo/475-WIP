var Database = require("../models/mymongo.js"),
    this_user = require('../models/auth').this_user;
var Chat = require('../models/chat.js');

exports.addMessage = function(req, res){
    my_name = this_user.first_name + " " + this_user.last_name
    now = new Date()
   	var newChat = {
        message: req.body.message,
        author: my_name,
        date: now
    };
    Database.insert(
        "housemates",
        "chats",
        newChat,
        function(model) {
            res.send('chat', {
            	user:this_user,
            	date: now
            });
        }
    );
}

exports.getChats = function(req, res){
	Database.find("housemates","chats","", function(model){
		res.send(model)
	})
}