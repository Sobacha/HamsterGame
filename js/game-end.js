'use strict';


// if user tries to access this page before it makes enough money, redirect to game.html.
if (!localStorage.getItem('game')) {
        window.location.href = 'index.html';
} else {
	// Retrieve Game object from Local Storage
	var game = localStorage.getItem('game');
	game = JSON.parse(game);
	if (!game.Cleared) {
		window.location.href = 'game.html';
	}
}


/***** Event listener for buttons *****/

// Onclick return button, redirect to game.html.
function redirectToGamePageOnclick() {
	window.location.href = 'game.html';
}

var returnToStatus = document.getElementById('return');
returnToStatus.addEventListener('click', redirectToGamePageOnclick, false);

// Onclick restart button, restart a game by redirecting ro index.html.
function restartGameOnclick() {
	localStorage.clear();
	window.location.href = 'index.html';
}

var restartGame = document.getElementById('restart');
restartGame.addEventListener('click', restartGameOnclick, false);
