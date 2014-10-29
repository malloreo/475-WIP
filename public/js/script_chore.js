$(function(){

	getChores()

})

function getChores(){ // populate page with all chore information
	// $("#all-chores").html("")
	// $("#my-chores").html("")
	// $("#their-chores").html("")
	console.log("running getChores in script_chore_add.js");
	$.ajax({
		url: "getChores",
		type: "get",
		data: {},
		success: function(chores) {
			if (chores.length == 0){
				message = "There are currently no chores in the system."
				$("#all-chores").html(message)
			}else{
				$.ajax({
					url: "getAssigns",
					type:"get",
					data:{},
					success: function(assigns){
						console.log(assigns)
						my_assignments = assigns["my_assignments"]
						their_assignments = assigns["their_assignments"]
						console.log("Parsing My ")
						my_message = parseAssignments(my_assignments, chores)
						console.log("Parsing Their")
						their_message = parseAssignments(their_assignments, chores)
						if (my_message.length != ""){
							$("#my-chores").html(my_message)
						} else{ $("#my-chores").html("You don't have any chores assigned to you.")}
						if (their_message.length != ""){
							$("#their-chores").html(their_message)
						} else{ $("#their-chores").html("No one else has any chores assigned to them.")}
					}
				})
				// data.forEach(function(chore){
				// 	message += chore.chore_name + ": " + chore.description + "<br>"
				// })
			}
			// $("#all-chores").html(message)
		}
	});
	return false;
}

function parseAssignments( assigns , chores ){
	message = "" 
	console.log(chores)
	assigns.forEach(function(a){
		chore_name = a.chore_name
		console.log(a)
		chores.forEach(function(chore){
			if (chore.chore_name == chore_name ){
				due_date = new Date(chore.due_date).toDateString()
				message += a.user_name +" is assigned to do " + chore.chore_name + " due on " + due_date + "<br>"
			}
		})
	})
	return message
}