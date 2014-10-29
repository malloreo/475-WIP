$(document).ready(function(){
	console.log("In dashboard_script.js")
	updateDashboardGroceries()
	updateDashboardBills()
	updateDashboardChores()
});

function updateDashboardGroceries(){
	console.log("----  IN Get Groceries SCRIPT---- ")
	$.ajax({
			url: "getGrocerylist",
			type: "get",
			data: {},
			success: function(data) {
				message = data
				$('#grocery-item').html(message);
			}
	});
	return false;
}

function updateDashboardBills(){

}

function updateDashboardChores(){
	console.log("----  IN Get Chores SCRIPT---- ")
	$.ajax({
			url: "getChores",
			type: "get",
			data: {},
			success: function(chores) {
				console.log(chores)
				if (chores.length == 0){
					$("#my-chores").html("There are currently no chores for you to do. Celebrate with some TV.")
				}
				else{
					$.ajax({
					url: "getAssigns",
					type:"get",
					data:{},
					success: function(assigns){
						console.log(assigns)
						my_assignments = assigns["my_assignments"]
						console.log("Parsing My ")
						my_message = parseAssignments(my_assignments, chores)
						
						if (my_message.length != ""){
							$("#my-chores").html(my_message)
						} else{ $("#my-chores").html("You don't have any chores assigned to you.")}
						
					}
					})

					// message = ""
					// data.forEach(function(d){
					// 	due = new Date(d.due_date)
					// 	message += d.chore_name +" is due on " + due.toDateString() + "<br>"
					// })
					
					// $("#my-chores").html(message)
				}
			}
	});
	return false;
};

function parseAssignments( assigns , chores ){
	message = "" 
	console.log(chores)
	assigns.forEach(function(a){
		chore_name = a.chore_name
		console.log(a)
		chores.forEach(function(chore){
			if (chore.chore_name == chore_name ){
				due_date = new Date(chore.due_date).toDateString()
				message += "You are assigned to do " + chore.chore_name + " due on " + due_date + "<br>"
			}
		})
	})
	return message
}