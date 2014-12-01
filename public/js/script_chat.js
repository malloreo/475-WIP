$(function() {
	getUser();
	getChats();
	console.log("top: "+document.getElementById('chat-messages').scrollTop) 
	console.log("height: "+document.getElementById('chat-messages').scrollHeight) 
	$("#chat-button").click(addMessage)
})

this_user = "";

function addMessage(){
	message = $("#message").val()
	if (/\S/.test(message)){
		$.ajax({
			url: "addMessage",
			type: "put",
			data: {
				message : message
			},
			success: function(data) {
				date = new Date(data.date)
				date_time_str = date.toLocaleString()
				// date_time_str = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
				// $('#chat-messages').append(data.user.name +" <i>[" + date_time_str + "]</i> : "+ message+"<br>");
				$('#chat-messages').append(str += "<div id='chat-me'>"+"<span>" + " <i>" + date_time_str + "</i></span><br>" + message + "</div>");
				$('#message').val("");
				$("#message").focus()
				document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight
			}
		});
	}
	return false;	
}

function getChats(){
	prevAuthor = ""
	prevTime = ""
	$.ajax({
		url: "getChats",
		type: "get",
		data: {},
		success: function(data){
			str = ""
			data.forEach(function(d){
				date = new Date(d.date)
				date_time_str = date.toLocaleString()
				if (d.author == this_user){ //you
					str += "<div id='chat-me'>"+"<span>" + " <i>" + date_time_str + "</i></span><br>" + d.message + "</div>"
				} else { // someone else
					if (prevAuthor == d.author){ //same chatter as before
						if ((date.getMinutes()-prevTime.getMinutes())>3){ //show time again
							str += "<div id='chat-them'><span><i>" + date_time_str + "</i></span><br>" + d.message + "</div>"
						} else { // just show message
							str += "<div id='chat-them'>" + d.message + "</div>"
						}
					} else {
						str += "<div id='chat-them'><span><p>"+d.author + "</p> <i>" + date_time_str + "</i></span><br>" + d.message + "</div>"
					}
				}
				// str += d.author +" <i>[" + date_time_str + "]</i> : "+ d.message+"<br>"
				prevAuthor = d.author
				prevTime = date
			})
			
			$("#chat-messages").append(str)
			document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight
		}
	})
	return false;
}

function getUser(){
	$.ajax({
		url: "getUser",
		type: "get",
		data: {},
		success: function(data){
			this_user = data.name
		}
	})
}