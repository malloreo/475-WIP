$(function() {   // when document is ready
console.log("ready");
//check that username entered is email address
$('#grocery-formb').click(addGrocery);	
$('#grocery-remove').click(deleteGrocery);	
$(document).ready(getGroceries);
$(document).ready(getGroceriesNotBought);
$(document).ready(getGroceriesBought);
});
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
				message = $("#quantity").val() + " " + $("#name").val() + " has been added!"
				$('#test').html(message);
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