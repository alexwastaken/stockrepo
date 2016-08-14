$(document).ready(function () {

	$(function() {
		var ajaxRequest;
	    $("#form1").on("submit", function(e) {
	    	e.preventDefault();
	    	if(typeof ajaxRequest !== 'undefined'){
	    		ajaxRequest.abort();
	    	}
	        var $this = $(this);
	        ajaxRequest = $.ajax({
	            url: $(this).attr("action"),
	            type: 'POST',
	            data: $(this).serialize(),
	            beforeSend: function() {
	                $("#message").html("sending...");
	            },
	            success: function(data) {

	            }
	        }).done(function(response) {

	            $this.unbind('submit').submit();

	        });
	    });
	});

	$( ".btn" ).click(function() {
		$('div#loginBody').fadeIn(500)
		$('div#backgroundColorLogin').fadeIn(500)
	});

	$( "#backgroundColorLogin" ).click(function() {
		$('div#loginBody').fadeOut(500)
		$('div#backgroundColorLogin').fadeOut(500)
	});

	$( "#signIn" ).click(function() {
		$('input#fNameSettings').fadeOut(400)
		$('input#username').fadeOut(400)
		$('input#email').fadeOut(400)
		$('input#password').fadeOut(400)
		$('button#btnLoginSignUp').fadeOut(400)
		$('p#or').fadeOut(400)
		$('p#signIn').fadeOut(400)
		$('input#password, input#email, input#username, input#fNameSettings').fadeOut().promise().always(function(){
			$('p#signUp').fadeIn(400)
       		$('input#usernameSignIn').fadeIn(400)
			$('input#passwordSignIn').fadeIn(400)
			$('p#orSignUp').fadeIn(400)
			$('p#or').css( { display: "inline-block"} );
			$('button#btnLoginSignIn').fadeIn(400)
 		});

	});

	$( "#signUp" ).click(function() {
		$('p#signUp').fadeOut(400)
       	$('input#usernameSignIn').fadeOut(400)
		$('input#passwordSignIn').fadeOut(400)
		$('p#orSignUp').fadeOut(400)
		$('button#btnLoginSignIn').fadeOut(400)

	$('input#usernameSignIn, input#passwordSignIn').fadeOut().promise().always(function(){
			$('input#fNameSettings').fadeIn(400)
			$('input#username').fadeIn(400)
			$('input#email').fadeIn(400)
			$('input#password').fadeIn(400)
			$('button#btnLoginSignUp').fadeIn(400)
			$('p#or').fadeIn(400)
			$('p#signIn').fadeIn(400)
		});

	});

});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  var classes = event.target.className.split(' ');
  var found = false; var i = 0;
  while (i < classes.length && !found) {
      if (classes[i]=='dropbtn') found = true;
      else ++i;
  }
  if (!found) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}