$(function() {
	getBills();
});

function getBills() {
	console.log("running getBills in script_bill_add.js");
	$.ajax({
		url: "getBills",
		type: "get",
		data: {},
		success: function(data) {
			message = "";
			data.forEach(function(bill) {
				select = "<option value='"+bill.bill_name+"'>"+bill.bill_name+"</option>";
				message += select;
			})
			$('#select_bill_name').html(message);
		}
	});
	return false;
}