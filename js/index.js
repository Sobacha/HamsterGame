'use strict';


// Job objects
var jobs = {
	Walk: {
		name: "Walk",
		reqLev: 1,
		salary: 10,
	},
	Run: {
		name: "Run",
		reqLev: 2,
		salary: 30,
	},
	Clean: {
		name: "Clean",
		reqLev: 4,
		salary: 75,
	},
	Teach: {
		name: "Teach",
		reqLev: 6,
		salary: 125,
	},
	Invest: {
		name: "Invest",
		reqLev: 8,
		salary: 300,
	},
}

// Game object
if (localStorage.getItem('game')) {
	window.location.href = 'game.html';
} else {
	var game = {Hamsters: [], Jobs: jobs, Money: 0, Price: 50000, HamsterPrice: 200, Cleared: false};
}


/***************************************************************/


//Onclick, hide the button and show a form to register a hamster
function displayOnClick() {
	document.getElementById('beginningDiv').style.display = "none";
	document.getElementById('formDiv').style.display = "block";
}

// Validate hamster name
function validateHamsterName () {
	var name = document.getElementById('hamsterName').value;
	if (name != null && name.trim() !== '') {
		return name;
	}
	return false;
}

// Create hamster in game obj if hamsters form is submitted
function createHamster() {
	var name = validateHamsterName();
	if (name) {
		var hamster = {
			number: (game.Hamsters.length)+1,
			name: name,
			job: game.Jobs.Walk,
			level: 1,
			levelupTimer: 0 };
		game.Hamsters.push(hamster);
	}
}


/************************************************************/


// When start button is clicked, show form to create hamsters.
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', displayOnClick, false);

// Once hamster form is submitted, save hamsters in game obj.
var hamsterForm = document.getElementById('createHamster');
hamsterForm.addEventListener('submit', function(event) {
	event.preventDefault();

	if (validateHamsterName() === false) {
		alert('Please input name for your hamster.');
	} else {
		createHamster();
		localStorage.setItem('game', JSON.stringify(game));
		window.location.href = 'game.html';
	}
});

