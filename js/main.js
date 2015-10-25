import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import Player from './player';
import Enemy from './enemy';
import Movesets from './moves';


// Player Instances
let pokePlayer = new Player({});

// Enemy Instances
let pokeEnemy = new Enemy({});

// Movesets instances
let zardMoves = new Movesets({
	one: 'Tackle',
	two: 'Bite',
	three: 'Flame Strike',
	four: 'Flamethrower' 
});

let venoMoves = new Movesets({
	one: 'Tackle',
	two: 'Bite',
	three: 'Vine Whip',
	four: 'Solar Beam'
});

let blastMoves = new Movesets({
	one: 'Tackle',
	two: 'Bite',
	three: 'Water Punch',
	four: 'Hydro Pump'
});


// Jquery node variables
let playerHealth = $('#player-health');
let enemyHealth = $('#enemy-health');
let move1 = $('#move1');
let move2 = $('#move2');
let move3 = $('#move3');
let move4 = $('#move4');
let combatText = $('.combat-text');
let selectZard = $('#char-pon');
let selectVeno = $('#veno-pon');
let selectBlast = $('#blast-pon');

// Audio variables 
let audio1 = document.getElementById('open');
let audio2 = document.getElementById('battle');

// Set player and Enemy health to 1000
playerHealth.text(pokePlayer.health + '/1000');
enemyHealth.text(pokeEnemy.health + '/1000');

// Click event for title screen
$('.begin').on('click', function() {
	$('#launch-bot').fadeOut(500, function() {
		$('#launch-top').fadeOut(500, function() {
			$('.select-page').fadeIn(500);
		});
	});
});

// Start game click event:
// fadeout pages and stop/start audio 
// clears health changes and combat text
// adds correct sprites to combat area
// adds correct moves to move buttons
$('.start-game').on('click', function() {
	audio1.pause();
	audio2.play();
	audio1.currentTime = 0;
	audio2.currentTime = 0;
	$('.select-page').fadeOut(500, function () {
		$('.main').fadeIn(1000, function () {
			$('.bottom').fadeIn(750);
		});
	});

	// Determine if the game has been changed from start
	// Clear health and remove text 
	if (pokeEnemy.health < 1000 || pokePlayer.health < 1000) {
			pokeEnemy.resetHealth();
			enemyHealth.text(pokeEnemy.health + '/1000');
			pokePlayer.resetHealth();
			playerHealth.text(pokePlayer.health + '/1000');
			$(combatText).empty();
			$(move1).empty();
			$(move2).empty();
			$(move3).empty();
			$(move4).empty();

			// Determine if either of three pokemon have been checked
			// Add that pokemon's moves to skill list
			// Add sprite to game board
			if (selectZard.is(':checked')) {
				$('#player-name').append('Zarichard');
				$('#enemy-name').append('Tastbloise')
				$(move1).append(zardMoves.one);
				$(move2).append(zardMoves.two);
				$(move3).append(zardMoves.three);
				$(move4).append(zardMoves.four);
			} else if (selectVeno.is(':checked')) {
				$('#player-name').append('Xenosaur');
				$('#enemy-name').append('Zarichard')
				$(move1).append(venoMoves.one);
				$(move2).append(venoMoves.two);
				$(move3).append(venoMoves.three);
				$(move4).append(venoMoves.four);
			} else if (selectBlast.is(':checked')) {
				$('#player-name').append('Tastbloise');
				$('#enemy-name').append('Xenosaur')
				$(move1).append(blastMoves.one);
				$(move2).append(blastMoves.two);
				$(move3).append(blastMoves.three);
				$(move4).append(blastMoves.four);
			}

		// If game wasn't changed, do the same anyways
	} else {
		$(combatText).empty();
		$(move1).empty();
		$(move2).empty();
		$(move3).empty();
		$(move4).empty();

			// Determine if either of three pokemon have been checked
			// Add that pokemon's moves to skill list
			// Add sprite to game board
			if (selectZard.is(':checked')) {
				$('#enemy-toon').removeClass('no-class');
				$('#enemy-toon').addClass('enemytoon-blast');
				$('#player-name').append('Zarichard');
				$('#enemy-name').append('Tastbloise');
				$(move1).append(zardMoves.one);
				$(move2).append(zardMoves.two);
				$(move3).append(zardMoves.three);
				$(move4).append(zardMoves.four);
			} else if (selectVeno.is(':checked')) {
				$('#enemy-toon').removeClass('no-class');
				$('#enemy-toon').addClass('enemytoon-zard');
				$('#player-name').append('Xenosaur');
				$('#enemy-name').append('Zarichard');
				$(move1).append(venoMoves.one);
				$(move2).append(venoMoves.two);
				$(move3).append(venoMoves.three);
				$(move4).append(venoMoves.four);
			} else if (selectBlast.is(':checked')) {
				$('#enemy-toon').removeClass('no-class');
				$('#enemy-toon').addClass('enemytoon-veno');
				$('#player-name').append('Tastbloise');
				$('#enemy-name').append('Xenosaur');
				$(move1).append(blastMoves.one);
				$(move2).append(blastMoves.two);
				$(move3).append(blastMoves.three);
				$(move4).append(blastMoves.four);
			}
	}
	
});

// Click event to fadeout pages and stop/start audio 
$('#new-game').on('click', function() {
	audio2.pause();
	audio1.play();
	audio1.currentTime = 0;
	audio2.currentTime = 0;
	$('.bottom').fadeOut(500, function () {
		$('.main').fadeOut(500, function () {
			$('.select-page').fadeIn(1000);
		});
	});
	
});

// Click event to stop/start audio 
$('#quit-game').on('click', function() {
	audio2.pause();
	audio1.pause();
	audio1.currentTime = 0;
	audio2.currentTime = 0;
});

// Click Move1 Function to hit enemy and display results
move1.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(5, 25);
  pokeEnemy.hit(num);
  enemyHealth.text(pokeEnemy.health + '/1000');

  // Display health change and damage amount in combat text
  let eventText = pokeEnemy.health;
  $(combatText).empty();
  $(combatText).append('You hit charizardEnemy for ' + num + ' damage!');
});

// Click Move2 Function to hit enemy and display results
move2.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(20, 100);
  pokeEnemy.hit(num); 
  enemyHealth.text(pokeEnemy.health + '/1000');

  // Display health change and damage amount in combat text
  let eventText = pokeEnemy.health;
  $(combatText).empty();
  $(combatText).append('You hit charizardEnemy for ' + num + ' damage!');
  
});

// Click Move3 Function to hit enemy and display results
move3.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(50, 200);
  pokeEnemy.hit(num);
  enemyHealth.text(pokeEnemy.health + '/1000');

  // Display health change and damage amount in combat text
  let eventText = pokeEnemy.health;
  $(combatText).empty();
  $(combatText).append('You hit charizardEnemy for ' + num + ' damage!');
  
});

// Click Move4 Function to hit enemy and display results
move4.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(100, 500);
  pokeEnemy.hit(num);
  enemyHealth.text(pokeEnemy.health + '/1000');

  // Display health change and damage amount in combat text
  let eventText = pokeEnemy.health;
  $(combatText).empty();
  $(combatText).append('You hit charizardEnemy for ' + num + ' damage!');
  
});

