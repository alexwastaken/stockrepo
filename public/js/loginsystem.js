$(document).ready(function () {
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
		$('input#lNameSettings').fadeOut(400)
		$('input#username').fadeOut(400)
		$('input#password').fadeOut(400)
		$('button#btnLoginSignUp').fadeOut(400)
		$('input#password, input#username, input#lNameSettings, input#fNameSettings').fadeOut().promise().always(function(){
			$('p#signIn')
       		$('input#usernameSignIn').fadeIn(400)
			$('input#passwordSignIn').fadeIn(400)
			$('button#btnLoginSignIn').css( { marginLeft : "205px" } );
			$('p#signIn').css( { marginLeft : "222px"} )
			$('p#signIn').text('sign up')
			$('button#btnLoginSignIn').fadeIn(400)
 		});

	});

});