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
		$('p#or').fadeOut(400)
		$('p#signIn').fadeOut(400)
		$('input#password, input#username, input#lNameSettings, input#fNameSettings').fadeOut().promise().always(function(){
			$('p#signUp').fadeIn(400)
       		$('input#usernameSignIn').fadeIn(400)
			$('input#passwordSignIn').fadeIn(400)
			$('button#btnLoginSignIn').css( { marginLeft : "205px" } );
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
			$('input#lNameSettings').fadeIn(400)
			$('input#username').fadeIn(400)
			$('input#password').fadeIn(400)
			$('button#btnLoginSignUp').fadeIn(400)
			$('p#or').fadeIn(400)
			$('p#signIn').fadeIn(400)
		});

	});


});