$(function() {   // when document is ready
// console.log("ready");

	getGroceriesBought();
	getGroceriesNotBought();
	$('#tab2').hide()

    //show grocery popup
	$('#grocery_add_pg').click(function(){
		$('#grocery_add_bkgd').fadeIn();
		$('#grocery_add_popup').fadeIn();
	})
	//hide grocery popup
	$('#grocery_add_x').click(function(){
		$('#grocery_add_bkgd').fadeOut();

		//clear form fields
	})
	$('#grocery_feedback_close').click(function(){
		$('#grocery_add_bkgd').fadeOut();
		$('#grocery_feedback_popup').fadeOut();
		//clear form fields
	})

	$('#grocery-formb').click(function(){
		addGrocery();
	});

})

function addGrocery(){
	console.log("----  IN ADD Grocery SCRIPT ---- ")
	$.ajax({
			url: "grocery_add",
			type: "put",
			data: {
				name: $("#name").val(),
				quantity: $("#quantity").val()
			},
			success: function(data) {
				getGroceriesBought();
				getGroceriesNotBought();
				message = $("#quantity").val() + " " + $("#name").val() + " was added to the shopping list!"
				$('#grocery_feedback_popup span').html(message);
				$('#grocery_feedback_popup').fadeIn();
				$('#name').val("");
				$('#quantity').val("");
			}
	});
	return false;	
}
function deleteGrocery(){
	console.log("----  IN Delete Grocery SCRIPT ---- ")
	alert('deleteGrocery');
	$.ajax({
			url: "deleteGrocery",
			type: "get",
			data: {},
			success: function(data) {
				res.redirect('/grocery');
			}
	});
	return false;	
}

function updateGroceryAsBought(){
	console.log("---- In Update Grocery As Bought SCRIPT -----")
	alert('updateGroceryAsBought');
	$.ajax({
		url: "updateGroceryAsBought",
		type: "get",
		data: {},
		success: function(data) {
			res.redirect('/grocery');
		}
	});
	return false;
}	

function reactivateGrocery() {
	console.log("----- reactivateGrocery SCRIPT -----")
	alert('reactivateGrocery');
	$.ajax({
		url:"reactivateGroceryList",
		type:"get",
		data: {},
		success: function(data) {
			res.redirect('/grocery');
		}
	});
	return false;
}

function getGroceries(){
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


function getGroceriesNotBought() {
	console.log("---- IN Get Groceries Not Bought SCRIPT ----")
	$.ajax({
		url: "getGroceryListNotBought",
		type: "get",
		data: {},
		success: function(data) {
			message = data
			$('#grocery-not-bought').html(message);
		}
	});
	return false;

}
function getGroceriesBought() {
	console.log("---- IN Get Groceries Bought SCRIPT ----")
	$.ajax({
		url: "getGroceryListBought",
		type: "get",
		data: {},
		success: function(data) {
			message = data
			$('#grocery-bought').html(message);
		}
	});
	return false;
}

function getGroceriesbyid(){
	console.log("----  IN Get Groceries SCRIPT---- ")
	$.ajax({
			url: "getGroceryListbyid",
			type: "get",
			data: {},
			success: function(data) {
				message = data
				$('#grocery-item').html(message);
			}
	});
	return false;	
}