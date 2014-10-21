$(function() {   // when document is ready

	$("#add_chore_b").click(function(){
		console.log("clicked");
		// $("#add_chore_div").fadeIn();
		getHousematesAsDropdown();

	});

}); //document ready

//gets housemates and displays them as values in a dropdown menu
function getHousematesAsDropdown(){
	console.log("gethousematesasdropdown");
	$.ajax({
			url: "getHousemates",
			type: "get",
			data: {
			},
			success: function(data) {
				$('#add_chore_d').html(data);
			}
	});
	return false;
}