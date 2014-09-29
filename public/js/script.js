$(function() {   // when document is ready
	console.log("ready");
	//check that username entered is email address
	$('#signup-form').submit(function(){
		$.ajax({
			url: "signup",
			type: "post",
			data: {
				email: $("#signup-email").val(),
				password: $("#signup-password").val()
			},
			success: function(data) {
				$('#div1').html(data);
				$('#maker1').val("");
				$('#maker2').val("");
				$('#maker3').val("");
			}
		});
		return false;	
	});











});