$(function() {   // when document is ready

	// $("#add_chore_b").click(function(){
	// 	console.log("clicked");
	// 	// $("#add_chore_div").fadeIn();
	// 	// getHousematesAsDropdown();

	// });

}); //document ready

// //gets housemates and displays them as values in a dropdown menu
// function getHousematesAsDropdown(){
// 	console.log("gethousematesasdropdown");
// 	$.ajax({
// 			url: "getHousemates",
// 			type: "get",
// 			data: {
// 			},
// 			success: function(data) {
// 				$('#add_chore_d').html(data);
// 			}
// 	});
// 	return false;
// }

// the first function i made to fake the interaction
// function addChore(){
// 	console.log("----  IN ADD CHORE SCRIPT FXN ---- ")

// 	$.ajax({
// 			url: "addChore",
// 			type: "put",
// 			data: {
// 				chore_name: $("#chore_name").val(),
// 				user: $("#chore_user").val(),
// 				due_date: $("#chore_date").val()
// 			},
// 			success: function(data) {
// 				date = $("#chore_date").val()
// 				date = date.substring(5,date.length);
// 				message = $("#chore_name").val() + " for " + $("#chore_user").val() + " to do by " + date + " has been added!"
// 				$('#test').html(message);
// 				$('#chore_name').val("");
// 				$('#chore_user').val("");
// 				$('#chore_date').val("");
// 			}
// 	});
// 	return false;	
// }