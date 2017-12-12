'use strict';



/***** Display content depends on tab *****/

// Onclick hamster tab, show content.
function displayHamsterContentOnClick() {
	// focus hamster tab
	document.getElementById('hamsterTab').focus();

	document.getElementById('hamsterContent').style.display = "block";	
	document.getElementById('statusContent').style.display = "none";
	document.getElementById('infoContent').style.display = "none";
}

// Onclick status tab, show content.
function displayStatusContentOnClick() {
	// focus status tab
	document.getElementById('statusTab').focus();

        document.getElementById('hamsterContent').style.display = "none";
        document.getElementById('statusContent').style.display = "block";
	document.getElementById('infoContent').style.display = "none";
}

// Onclick info tab, show content.
function displayInfoContentOnClick() {
	// focus info tab
	document.getElementById('infoTab').focus();
        
	document.getElementById('hamsterContent').style.display = "none";
        document.getElementById('statusContent').style.display = "none"; 
	document.getElementById('infoContent').style.display = "block";
}


// Disable hamster tab if 5 hamsters exist.
function disableHamsterTab() {
	if (game.Hamsters.length === 5) {
		document.getElementById('hamsterTab').disabled = true;
	}
}


// Make hamsters more expensive
function calculatePrice() {
	return game.HamsterPrice * game.Hamsters.length * game.Hamsters.length;
}

// Enable/disable hamster tab if not enough money to buy a hamster.
function enableDisableHamsterTab() {
	if (game.Money < calculatePrice() || game.Hamsters.length === 5) {
		document.getElementById('hamsterTab').disabled = true;
	} else {
		document.getElementById('hamsterTab').disabled = false;
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
		game.Money = game.Money - calculatePrice();
		game.Hamsters.push(hamster);
		// Update hamster price on hamster tab
		insertHamsterTabHtml();
	}
}


/***** Insert HTML for hamster tab with hamster price *****/
function insertHamsterTabHtml() {
	var hamsterTab = document.getElementById('hamsterTab');
	hamsterTab.innerHTML = 'New Hamster costs ' + calculatePrice();
}


/***** Insert HTML for game info content *****/

// Insert job  HTML
function insertGameInfoHtml() {
	var gameInfo = document.getElementById('gameInfo');
	gameInfo.innerHTML = 'Your goal is to be a castle owner! Although the castle costs a lot of money, cute little hamsters are here to help you to buy the castle! At the beginning you have one hamster and the hamster dilligently works so you can get money to buy next hamster(up to 5 hamsters) and eventually the castle. For your information, price for a hamster goes up as you buy them more. There are 5 jobs. Each job requires certain level. Once your hamsters reach the required level, a job will be available. You can change job by clicking job buttons.';

	var jobDescription = document.getElementById('jobDescription');
	var insertingHtml = '';
	for (var i = 0; i < keysJobs.length; i++) {
		insertingHtml = insertingHtml.concat(
				'<li>' + game.Jobs[keysJobs[i]].name +
				': [required level: ' + game.Jobs[keysJobs[i]].reqLev +
				', salary: ' + game.Jobs[keysJobs[i]].salary +
				']</li>');
	}
	jobDescription.innerHTML = insertingHtml;
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


function eventListenerUpdateHamstersJob(hamsterObj) {
	for (var i = 0; i < keysJobs.length; i++) {
        	var jobButton = document.getElementById(
				hamsterObj.number +
				game.Jobs[keysJobs[i]].name);
		eventListenerUpdateOneHamstersJob(jobButton, hamsterObj, game.Jobs[keysJobs[i]]);
	}
}


/***** Insert status HTML *****/

// Insert status content HTML for one hamster
function addStatusContentForNewHamster(hamsterObj) {
	var statusTable = document.getElementById('hamsterWrapper');
	var newRow = statusTable.insertRow(hamsterObj.number);

	var name = newRow.insertCell(0);
	name.id = "hamsterName";
	name.innerHTML = hamsterObj.name;

	var level = newRow.insertCell(1);
	level.id = "currentLevel" + hamsterObj.number;
	level.innerHTML = hamsterObj.level;

	var job = newRow.insertCell(2);
	job.id = "currentJob";
	job.innerHTML = '<p id="jobName' + hamsterObj.number + '">' + hamsterObj.job.name + '</p>';

	var jobButtons = newRow.insertCell(3);
	jobButtons.id = "jobButtonsCell";
	jobButtons.innerHTML = insertJobButtons(hamsterObj);

	var time = newRow.insertCell(4);
	time.id = "leftInTimer" + hamsterObj.number;
	time.innerHTML = (21-hamsterObj.levelupTimer);
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
		// Enable/disable hamster tab if not enough money to buy a hamster.
		enableDisableHamsterTab();	
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
	//console.log(game.Hamsters);
	var keysJobs = Object.keys(game.Jobs);
}


// focus status tab
displayStatusContentOnClick();

insertHamsterTabHtml();
insertGameInfoHtml();
// Check if there are five hamsters.
disableHamsterTab();
// Insert castle price in html
document.getElementById('price').innerHTML = 'Castle price: ' + game.Price;
// Insert status rows
for (var i = 0; i < game.Hamsters.length; i++) {
	console.log(game.Hamsters[i]);
	addStatusContentForNewHamster(game.Hamsters[i]);
	// Update job buttons
        enableDisableJobButtons(game.Hamsters[i]);
	eventListenerUpdateHamstersJob(game.Hamsters[i]);
}


// Set event listeners
var hamsterTab = document.getElementById('hamsterTab');
var statusTab = document.getElementById('statusTab');
var infoTab = document.getElementById('infoTab');
hamsterTab.addEventListener('click', displayHamsterContentOnClick, false);
statusTab.addEventListener('click', displayStatusContentOnClick, false);
infoTab.addEventListener('click', displayInfoContentOnClick, false);

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
		// Insert status row for new hamster in table.
		addStatusContentForNewHamster(game.Hamsters[game.Hamsters.length-1]);
		//console.log(game);
		document.getElementById('hamsterName').value = 'Hamster';
		// Switch tab to status
		displayStatusContentOnClick();
		// Disable hamster tab if 5 hamsters are created.
		disableHamsterTab();
		// Set event listener for new hamster.
		eventListenerUpdateHamstersJob(game.Hamsters[game.Hamsters.length-1]);
	}
});

// Main loop to update money, level, timer in sec base.
updateEverything();

