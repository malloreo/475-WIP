$(function() {   // when document is ready
console.log("ready");
//check that username entered is email address
$('#signup-form').submit(function(){
	if (checkIfEmail($('#signup-form').val())){
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
	}
});

// $("#s-chores").tooltip({placement: 'right', title: 'Chores'});
	
}); //document ready

function checkIfEmail(word){
	//code here
	return true;
}



