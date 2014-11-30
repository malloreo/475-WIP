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

	/*-------- adding item to bill ---------*/
	//show grocery popup
	// $('#gbill_pg').click(function(){
		
	// })
	//hide grocery popup
	$('#gbill_add_x').click(function(){
		$('#gbill_bkgd').fadeOut();

		//clear form fields
	})
	$('#gbill_close').click(function(){
		$('#gbill_bkgd').fadeOut();
		$('#gbill_popup').fadeOut();
		//clear form fields
	})

	$('#gbill-formb').click(function(){
		$(this).fadeOut();
		addNewBill();
		$("#bill_name").val("");
		$("#amount").val("");
		$("#date").val("");
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
			message = ""
			if (data.length != 0) {
				message = "<ul>"
                for( var i =0;i< data.length;i++ ) {
                var item = data[i];
                message += '<li><table id="grocery-item"><tr><td>' + item.quantity + ' ' + item.name + ' </td><td> <a href="/updateGroceryAsBought/' + item._id + '">Deactivate' + '</a></td><td>  <a href="/deleteGrocery/' + item._id + '">Remove</a></td></tr></table></li>';
                }
                message += '</ul>';
            } 
            else
            {
                message = '<i>There are currently no groceries for you to buy. Go eat something.</i>';
            }
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
			message = ""
			if (data.length != 0) {
				message = '<ul>'
                for( var i =0;i< data.length;i++ ) {
                var item = data[i];
                message += '<li><table><tr><td id="grocery-item">' + item.quantity + ' ' + item.name + ' </td><td> <a id="gitem-b" href="/updateGroceryAsBought/' + item._id + '">Mark as Bought' + "</a></td><td><a id='delete-b' href='/deleteGrocery/'" + item._id + "><img src='images/icon_delete.png' width='20px'></a></td></tr></table></li>";
                }
                message = message.substring(0, message.length-3)
                message += +'</ul>';
            } 
            else
            {
                message = '<br><i>There are currently no groceries for you to buy. Go eat something.</i>';
            }
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
			message = ""
			if (data.length != 0) {
				message = '<ul>'
                for( var i =0;i< data.length;i++ ) {
	                var item = data[i];
	                message += '<li><table><tr><td id="grocery-item">' + item.quantity + ' ' + item.name + ' </td><td> <a id="gitem-b" href="/reactivateGroceryList/' + item._id + '">Add to Shopping List</a>' + "</td><td><a class='bill-b' id='"+item.quantity+" "+item.name+"' onclick='addGroceryToBills(this);'><img src='images/icon_bills.png' width='20px'></a> <a id='delete-b' href='/deleteGrocery/'" + item._id + "><img src='images/icon_delete.png' width='20px'></a></td></tr></table></li>";
                }
                message += '</ul>';
            } 
            else
            {
                message = '<br><i>There are currently no groceries for you to buy. Go eat something.</i>';
            }
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

//converting purchases to bills
function addGroceryToBills(item){
	// console.log("a boobadeeboobadee")
	console.log("bill-b id: ",item.id);
	$('#bill_name').val(item.id);
	$('#gbill_bkgd').fadeIn();
	$('#gbill_popup').fadeIn();

}

function addNewBill(){
	console.log("----  IN ADD BILL SCRIPT FXN ---- ")
	bill_name = $("#bill_name").val();
	amount = $("#amount").val();
	date = $("#date").val();
	user_name = $('#user_name').val();
	payer = $( ":checkbox:checked" )
			  .map(function() {
			    return this.value;
			  })
			  .get()
	partial_amount = ""

	$.ajax({
			url: "bill_add_new",
			type: "post",
			data: {
				bill_name: bill_name,
				amount: amount,
				date: date,
				user_name: user_name,
				partial_amount: partial_amount,
				payer: payer
			},
			success: function(data) {
				$('#gbill_add_popup').fadeOut();

				due = new Date(date);
				due.setDate(due.getDate()+1); //fixes weird bug where day is subtracted by one when made into new Date
				due = due.toDateString();
				message = "The expense "+bill_name+" paid by "+user_name+" to "
				for (var i=0; i<payer.length; i++){
					message += payer[i]
					if (i != payer.length-1){
						message += ", "
					}
					if (i == payer.length-2){
						message += "and "
					}
				}
				message += " on "+due+" has been added."
				$('#gbill_feedback_popup span').html(message);
				$('#gbill_feedback_popup').fadeIn();

			}
	});
	return false;
}