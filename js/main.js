import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import Player from './player';
import Enemy from './enemy';

// Player Instances
let charizardPlayer = new Player();
// let bulbasaurPlayer = new Player();
// let venosaurPlayer = new Player();

// Enemy Instances
let charizardEnemy = new Enemy();
// let bulbasaurEnemy = new Enemy();
// let venosaurEnemy = new Enemy();

// Jquery node variables
let playerHealth = $('#player-health');
let enemyHealth = $('#enemy-health');
let move1 = $('#move1');
let move2 = $('#move2');
let move3 = $('#move3');
let move4 = $('#move4');
let combatText = $('.combat-text');

// Set player and Enemy health to 1000
playerHealth.text(charizardPlayer.health);
enemyHealth.text(charizardEnemy.health);

// Click Move1 Function to hit enemy and display results
move1.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(0, 25);
  charizardEnemy.hit(num);
  enemyHealth.text(charizardEnemy.health);

  // Display health change and damage amount in combat text
  let eventText = charizardEnemy.health;
  $(combatText).empty();
  $(combatText).append('You hit charizardEnemy for ' + num + ' damage!');
});

// Click Move2 Function to hit enemy and display results
move2.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(0, 100);
  charizardEnemy.hit(num); 
  enemyHealth.text(charizardEnemy.health);

  // Display health change and damage amount in combat text
  let eventText = charizardEnemy.health;
  $(combatText).empty();
  $(combatText).append('You hit charizardEnemy for ' + num + ' damage!');
  
});

// Click Move3 Function to hit enemy and display results
move3.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(0, 200);
  charizardEnemy.hit(num);
  enemyHealth.text(charizardEnemy.health);

  // Display health change and damage amount in combat text
  let eventText = charizardEnemy.health;
  $(combatText).empty();
  $(combatText).append('You hit charizardEnemy for ' + num + ' damage!');
  
});

// Click Move4 Function to hit enemy and display results
move4.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(0, 500);
  charizardEnemy.hit(num);
  enemyHealth.text(charizardEnemy.health);

  // Display health change and damage amount in combat text
  let eventText = charizardEnemy.health;
  $(combatText).empty();
  $(combatText).append('You hit charizardEnemy for ' + num + ' damage!');
  
});

