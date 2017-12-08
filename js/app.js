// When start button is clicked, hide the button and show a form to register hamsters
function displayOnClick() {
	document.getElementById('beginningDiv').style.display = "none";
	document.getElementById('formDiv').style.display = "block";
}

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', displayOnClick, false);

// Validate hamster name
function validateHamsterName (name) {
	if (name != null && name.trim() !== '') {
		return true;
	}
	return false;
}

// Validate hamster job
function validateHamsterJob (job) {
	if (job === 'choose') {
		return false;
	}
	return true;
}

// Create hamster in game obj if hamsters form is submitted
function createHamster(game) {
	// Validate input value and save hamsters
	var name = document.getElementById('hamsterName').value;
	var job = game.Jobs.(document.getElementById('hamsterJob').value);
	if (validateHamsterName(hamsterName) && validateHamsterJob(hamsterJob)) {
		var hamster = {
			number: (game.Hamsters.length)+1,
			name: name,
			job: job,
			level: 1 };
		(game.Hamsters).push(hamster);
	}
}

// Update hamster's job
function updateHamsterJob(game) {

}



// Game object
var game = {
	Hamsters: [],
	Jobs: {
		"Run": {reqLev: 5, salary: 50},
		"Walk": {reqLev:1, salary: 10},
		"Clean": {reqLev: 5, salary: 10}}
};




// When start button is clicked, show form to create hamsters.
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', displayOnClick, false);

// Once hamster form is submitted, save hamsters in game obj.
var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function(game) {
	saveHamsters(game);

	// redirect status page
	window.location.href = 'status.html';

	// update content to show hamsters
	if (game.Hamsters !== []) {
		var hamsters = document.getElementById('hamsters');
		var insertingRows = '';
		for (var i = 0; i < (game.Hamsters).length; i++) {
			insertingRows.concat(
					'<th></th>');
		}
	}
},
false);

// Redirect to hamster status view

