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


// $("#chore_form").submit(addChore);
	
});

function checkIfEmail(word){
	//code here
	return true;
}


function addChore(){
	$.ajax({
			url: "addChore",
			type: "put",
			data: {
				chore_name: $("#chore_name").val(),
				user: $("#chore_user").val(),
				due_date: $("#chore_date").val()
			},
			success: function(data) {
				// $('#div1').html(data);
				$('#chore_name').val("");
				$('#chore_user').val("");
				$('#chore_date').val("");
			}
	});
	return false;	
}







});