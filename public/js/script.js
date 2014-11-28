$(function() {   // when document is ready
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

jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });

    jQuery('.tabs .tabbed-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });
});


