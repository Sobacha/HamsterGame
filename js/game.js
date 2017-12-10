'use strict';


// if user tries to access this page without starting game, redirect to index.html.
/*if (!localStorage.getItem('game')) {
        window.location.href = 'index.html';
} else {
	// Retrieve Game object from Local Storage
	var game = localStorage.getItem('game');
	game = JSON.parse(game);
	console.log(game);
}

var keysJobs = Object.keys(game.Jobs);
*/

/***** Display content depends on tab *****/

// Onclick hamster tab, show content.
function displayHamsterContentOnClick() {
	document.getElementById('hamsterContent').style.display = "block";	
	document.getElementById('statusContent').style.display = "none";
}

// Onclick status tab, show content.
function displayStatusContentOnClick() {
        document.getElementById('hamsterContent').style.display = "none";
        document.getElementById('statusContent').style.display = "block"; 
}

// Disable hamster tab if 5 hamsters exist.
function disableHamsterTab() {
	if (game.Hamsters.length === 5) {
		document.getElementById('hamsterTab').disabled = true;
	}
}


/***** Create hamster *****/

// Validate hamster name
function validateHamsterName () {
	var name = document.getElementById('hamsterName').value;
	if (name != null && name.trim() !== '') {
		return name;
	}
	return false;
}


// Save hamster in game obj if hamsters form is submitted
function createHamster() {
	// Validate input value and save hamsters
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


/***** Insert HTML for job buttons *****/

// Insert job buttons HTML in status for each hamster
function insertJobButtons(hamsterObj) {
        var jobButtonsHtml = '';

        for (var i = 0; i < keysJobs.length; i++) {
                jobButtonsHtml = jobButtonsHtml.concat(
				'<button id="' + hamsterObj.number + game.Jobs[keysJobs[i]].name +
				'" name="' + game.Jobs[keysJobs[i]].name + '">' +
				game.Jobs[keysJobs[i]].name + '</button> ');
        }
        return jobButtonsHtml;
}

// Onclick job button, Update hamster's job
function updateHamsterJob(hamsterObj, jobObj) {
	hamsterObj.job = jobObj;
	document.getElementById('jobName' + hamsterObj.number).innerHTML = hamsterObj.job.name;
}

// Set event listener for job buttons to update job for hamster
function eventListenerUpdateOneHamstersJob(jobButton, hamster, job) {
			jobButton.addEventListener(
					'click',
					function(){updateHamsterJob(hamster, job);},
					false);
}


function eventListenerUpdateHamstersJob() {
	for (var i = 0; i < keysJobs.length; i++) {
		for (var h = 0; h < game.Hamsters.length; h++) {
        		var jobButton = document.getElementById(
					game.Hamsters[h].number +
					game.Jobs[keysJobs[i]].name);
			eventListenerUpdateOneHamstersJob(jobButton, game.Hamsters[h], game.Jobs[keysJobs[i]]);

		}
	}
}


/***** Insert status HTML *****/

// Insert status content HTML
function insertStatusContent() {
	var statusContentHtml = '';
	var statusContent = document.getElementById('hamsterWrapper');

	statusContentHtml = statusContentHtml.concat(
				'<tr>' +
					'<th>Name</th>' +
					'<th>Level</th>' +
					'<th>Job</th>' +
					'<th>Time until level up</th>' +
				'</tr>');

	for (var i = 0; i < game.Hamsters.length; i++) {
		// hamster detail
		statusContentHtml = statusContentHtml.concat(
				'<tr>' +
					'<td id="hamsterName">' + game.Hamsters[i].name +
					'</td>' +
					'<td id="currentLevel' + game.Hamsters[i].number + '">' + game.Hamsters[i].level +
					'</td>' +
					'<td id="currentJob">' +
						'<p id="jobName' + game.Hamsters[i].number + '">' +
							game.Hamsters[i].job.name +
						'</p>' +
						'<p id="jobButtons">' +
							insertJobButtons(game.Hamsters[i]) +
						'</p>' +
					'</td>' +
					'<td id="leftInTimer' + game.Hamsters[i].number + '">' +
						(21-game.Hamsters[i].levelupTimer) +
					'</td>' +
				'</tr>');
	}

	statusContent.innerHTML = statusContentHtml;
}


/***** Enable/Disable job buttons *****/

// Enable/disable job buttons depends on hamster's level
function enableDisableJobButtons(hamsterObj) {
	for (var i = 0; i < keysJobs.length; i++) {
		var jobButton = document.getElementById(hamsterObj.number + game.Jobs[keysJobs[i]].name);
		if (hamsterObj.level >= game.Jobs[keysJobs[i]].reqLev) {
			jobButton.disabled = false;
		} else {
			jobButton.disabled = true;
		}
	}
}


/***** Onclick buy castle button, redirect to game-end.html *****/

function onclickBuyCastle() {
	game.Cleared = true;
	localStorage.setItem('game', JSON.stringify(game));
	window.location.href = 'game-end.html';
}


/***** Onclick restart button, redirect to index.html *****/
function onclickRestart() {
	localStorage.clear();
	window.location.href = 'index.html';
}


/***** Update money, level, time *****/

// Update level for hamster every 20 secs
function updateLevelPerTwentySecs() {
	for (var i = 0; i < game.Hamsters.length; i++) {
		if (game.Hamsters[i].levelupTimer === 20) {
			game.Hamsters[i].level = game.Hamsters[i].level + 1;
			game.Hamsters[i].levelupTimer = 1;
			document.getElementById('currentLevel' + game.Hamsters[i].number).innerHTML = game.Hamsters[i].level;

			// Update job buttons
			enableDisableJobButtons(game.Hamsters[i]);
	
		} else {
			game.Hamsters[i].levelupTimer++;
		}
	}
}

function formatLevelTimer(i) {
	var display = 20-game.Hamsters[i].levelupTimer
	if (display === 0) {
		return 20;
	} else {
		return display;
	}
}


// Update money, time every 1 sec.
function updateMoneyTimePerSec() {
	for (var i = 0; i < game.Hamsters.length; i++) {
		// Update money
		game.Money = game.Money + game.Hamsters[i].job.salary;
		// Enable buy castle button once it makes enough money.
		if (game.Money >= game.Price) {
			document.getElementById('buyCastle').disabled = false;
		}
		// Update money in HTML
		document.getElementById('money').innerHTML = 'Current money: ' + game.Money;

		// Update left time HTML to levelup
		document.getElementById('leftInTimer' + game.Hamsters[i].number).innerHTML = formatLevelTimer(i);

		// Update job buttons
		enableDisableJobButtons(game.Hamsters[i]);
	}
	console.log(game.Money);
}


function updateEverything() {
	updateMoneyTimePerSec();
	updateLevelPerTwentySecs();
	localStorage.setItem('game', JSON.stringify(game));
	//game = localStorage.getItem('game');
	//game = JSON.parse(game);
	setTimeout(updateEverything, 1000);
}


/***** Do after visit/refresh page *****/

// if user tries to access this page without starting game, redirect to index.html.
if (!localStorage.getItem('game')) {
        window.location.href = 'index.html';
} else {
	// Retrieve Game object from Local Storage
	var game = localStorage.getItem('game');
	game = JSON.parse(game);
	console.log(game);
}

var keysJobs = Object.keys(game.Jobs);

// Check if there are five hamsters.
disableHamsterTab();
// Insert castle price in html
document.getElementById('price').innerHTML = 'Castle price: ' + game.Price;
insertStatusContent();
eventListenerUpdateHamstersJob();


for (var i = 0; i < game.Hamsters.length; i++) {
	// Update job buttons
	enableDisableJobButtons(game.Hamsters[i]);
}

var hamsterTab = document.getElementById('hamsterTab');
var statusTab = document.getElementById('statusTab');
hamsterTab.addEventListener('click', displayHamsterContentOnClick, false);
statusTab.addEventListener('click', displayStatusContentOnClick, false);

var buyCastle = document.getElementById('buyCastle');
buyCastle.addEventListener('click', onclickBuyCastle, false);

var restart = document.getElementById('restartInGamePg');
restart.addEventListener('click', onclickRestart, false);


// Once hamster form is submitted, save hamster in game obj.
var hamsterForm = document.getElementById('createHamster');
hamsterForm.addEventListener('submit', function(event) {
	event.preventDefault();

	if (validateHamsterName() === false) {
		alert('Please input name for your hamster.');
	} else {
		createHamster();
		//localStorage.setItem('game', JSON.stringify(game));
		insertStatusContent();
		console.log(game);
		document.getElementById('hamsterName').value = 'Hamster';
		document.getElementById('statusContent').style.display = 'block';
		document.getElementById('hamsterContent').style.display = 'none';
		disableHamsterTab();
	}
});

updateEverything();


