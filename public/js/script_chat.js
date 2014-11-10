$(function() {
	$(document).ready(getChats);
	$("#button").click(addMessage)
})

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
				date_time_str = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
				$('#chat-messages').append(data.user.name +"[" + date_time_str + "]: "+ message+"<br>");
				$('#message').val("");
				$("#message").focus()
			}
		});
	}
	return false;	
}

function getChats(){
	$.ajax({
		url: "getChats",
		type: "get",
		data: {},
		success: function(data){
			str = ""
			data.forEach(function(d){
				date = new Date(d.date)
				date_time_str = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
				str += d.author +"[" + date_time_str + "]: "+ d.message+"<br>"
			})
			
			$("#chat-messages").append(str)
		}
	})
	return false;
}