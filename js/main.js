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
	one: 'Ember',
	eOne: 'Bubble',
	two: 'Flame Burst',
	eTwo: 'Water Pulse',
	three: 'Flamethrower',
	eThree: 'Aqua Tail',
	four: 'Flare Blitz',
	eFour: 'Hydro Pump'
});

let venoMoves = new Movesets({
	one: 'Vine Whip',
	eOne: 'Ember',
	two: 'Razor Leaf',
	eTwo: 'Flame Burst',
	three: 'Petal Blizzard',
	eThree: 'Flamethrower',
	four: 'Solar Beam',
	eFour: 'Flare Blitz'
});

let blastMoves = new Movesets({
	one: 'Bubble',
	eOne: 'Vine Whip',
	two: 'Water Pulse',
	eTwo: 'Razor Leaf',
	three: 'Aqua Tail',
	eThree: 'Petal Blizzard',
	four: 'Hydro Pump',
	eFour: 'Solar Beam'
});


// Jquery node variables
let playerHealth = $('#player-health');
let enemyHealth = $('#enemy-health');
let playerName = $('#player-name');
let enemyName = $('#enemy-name');
let move1 = $('#move1');
let move2 = $('#move2');
let move3 = $('#move3');
let move4 = $('#move4');
let combatText = $('.combat-text');
let selectZard = $('#char-pon');
let selectVeno = $('#veno-pon');
let selectBlast = $('#blast-pon');
let eMoveset = new Array();


// Audio variables 
let audio1 = document.getElementById('open');
let audio2 = document.getElementById('battle');
let audio3 = document.getElementById('win');

// Set player and Enemy health to 1000
playerHealth.text(pokePlayer.health + '/1000');
enemyHealth.text(pokeEnemy.health + '/1000');

// Add class to selected radio on selectpage
$(document).ready(function(){
    //add the Selected class to the checked radio button
    $('input:checked').parent().addClass("selected");
    //If another radio button is clicked, add the select class, and remove it from the previously selected radio
    $('input').click(function () {
        $('input:not(:checked)').parent().removeClass("selected");
        $('input:checked').parent().addClass("selected");
    });

});


// Click event for title screen
$('.begin').on('click', function() {
	if ($('#launch-top').is(':visible')){
		$('#launch-bot').fadeOut(500, function() {
		$('#launch-top').fadeOut(500, function() {
			$('.select-page').fadeIn(500);
		});
	});
	} 
	
});

// Start game click event:
// fadeout pages and stop/start audio 
// clears health changes and combat text
// adds correct sprites to combat area
// adds correct moves to move buttons
$('.start-game').on('click', function() {
	eMoveset.length = 0;
	audio1.pause();
	audio3.pause();
	audio2.play();
	audio1.currentTime = 0;
	audio2.currentTime = 0;
	audio3.currentTime = 0;
	if ($('.select-page').is(':visible')){
		$('.select-page').fadeOut(500, function () {
			$('.main').fadeIn(1000, function () {
				$('.bottom').fadeIn(750);
			});
		});
	}

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
			$(playerName).empty();
			$(enemyName).empty();

			// Determine if either of three pokemon have been checked
			// Add that pokemon's moves to skill list
			// Add sprite to game board
			if (selectZard.is(':checked')) {

				eMoveset.push(zardMoves.eOne);
				eMoveset.push(zardMoves.eTwo);
				eMoveset.push(zardMoves.eThree);
				eMoveset.push(zardMoves.eFour);

				$('#enemy-toon').removeClass();
				$('#enemy-toon').addClass('enemytoon-blast');
				$('#player-toon').removeClass();
				$('#player-toon').addClass('playertoon-zard');
				$(playerName).append('Zarichard');
				$(enemyName).append('Tastbloise');
				$(move1).append(zardMoves.one);
				$(move2).append(zardMoves.two);
				$(move3).append(zardMoves.three);
				$(move4).append(zardMoves.four);				
				
				
			} else if (selectVeno.is(':checked')) {
				
				eMoveset.push(venoMoves.eOne);
				eMoveset.push(venoMoves.eTwo);
				eMoveset.push(venoMoves.eThree);
				eMoveset.push(venoMoves.eFour);

				$('#enemy-toon').removeClass();
				$('#enemy-toon').addClass('enemytoon-zard');
				$('#player-toon').removeClass();
				$('#player-toon').addClass('playertoon-veno');
				$(playerName).append('Xenosaur');
				$(enemyName).append('Zarichard');
				$(move1).append(venoMoves.one);
				$(move2).append(venoMoves.two);
				$(move3).append(venoMoves.three);
				$(move4).append(venoMoves.four);
				
			} else if (selectBlast.is(':checked')) {
				
				eMoveset.push(blastMoves.eOne);
				eMoveset.push(blastMoves.eTwo);
				eMoveset.push(blastMoves.eThree);
				eMoveset.push(blastMoves.eFour);

				$('#enemy-toon').removeClass();
				$('#enemy-toon').addClass('enemytoon-veno');
				$('#player-toon').removeClass();
				$('#player-toon').addClass('playertoon-blast');
				$(playerName).append('Tastbloise');
				$(enemyName).append('Xenosaur');
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
		$(playerName).empty();
		$(enemyName).empty();

			// Determine if either of three pokemon have been checked
			// Add that pokemon's moves to skill list
			// Add sprite to game board
			if (selectZard.is(':checked')) {
				
				eMoveset.push(zardMoves.eOne);
				eMoveset.push(zardMoves.eTwo);
				eMoveset.push(zardMoves.eThree);
				eMoveset.push(zardMoves.eFour);
				

				$('#enemy-toon').removeClass();
				$('#enemy-toon').addClass('enemytoon-blast');
				$('#player-toon').removeClass();
				$('#player-toon').addClass('playertoon-zard');
				$(playerName).append('Zarichard');
				$(enemyName).append('Tastbloise');
				$(move1).append(zardMoves.one);
				$(move2).append(zardMoves.two);
				$(move3).append(zardMoves.three);
				$(move4).append(zardMoves.four);
				
			} else if (selectVeno.is(':checked')) {
				
				eMoveset.push(venoMoves.eOne);
				eMoveset.push(venoMoves.eTwo);
				eMoveset.push(venoMoves.eThree);
				eMoveset.push(venoMoves.eFour);

				$('#enemy-toon').removeClass();
				$('#enemy-toon').addClass('enemytoon-zard');
				$('#player-toon').removeClass();
				$('#player-toon').addClass('playertoon-veno');
				$(playerName).append('Xenosaur');
				$(enemyName).append('Zarichard');
				$(move1).append(venoMoves.one);
				$(move2).append(venoMoves.two);
				$(move3).append(venoMoves.three);
				$(move4).append(venoMoves.four);
				
			} else if (selectBlast.is(':checked')) {
				
				eMoveset.push(blastMoves.eOne);
				eMoveset.push(blastMoves.eTwo);
				eMoveset.push(blastMoves.eThree);
				eMoveset.push(blastMoves.eFour);

				$('#enemy-toon').removeClass();
				$('#enemy-toon').addClass('enemytoon-veno');
				$('#player-toon').removeClass();
				$('#player-toon').addClass('playertoon-blast');
				$(playerName).append('Tastbloise');
				$(enemyName).append('Xenosaur');
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
	audio3.pause();
	audio1.play();
	audio1.currentTime = 0;
	audio2.currentTime = 0;
	audio3.currentTime = 0;
		if ($('.bottom').is(':visible') || $('.main').is(':visible')){
		$('.bottom').fadeOut(500, function () {
			$('.main').fadeOut(500, function () {
				$('.select-page').fadeIn(1000);
			});
		});
	}
	
});

// Click event to stop/start audio 
$('#quit-game').on('click', function() {
	audio2.pause();
	audio1.play();
	audio3.pause();
	audio1.currentTime = 0;
	audio2.currentTime = 0;
	audio3.currentTime = 0;
	$('.bottom').fadeOut(500, function () {
		$('.main').fadeOut(500, function () {
			$('.select-page').fadeOut(500, function() {
				$('#launch-top').fadeIn(500);
				$('#launch-bot').fadeIn(500);
			});			
		});
	});
});



// Click Move1 Function to hit enemy and display results
move1.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(5, 25);
	let chance = _.random(1,100);



	if (chance <= 90) {
		pokeEnemy.hit(num);
		

		if (pokeEnemy.health <= 0) {
			setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move1).text() + '.');
		  	
			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It hit for ' + num + ' damage.');

				  	setTimeout( function() {
				  		enemyHealth.text('FNT/1000');
  						alert("Enemy Trainer's pokemon fainted... You won! Press the 'Home' button to start a new game!");
  						audio1.pause();
  						audio2.pause();
							audio3.play();
							audio1.currentTime = 0;
							audio2.currentTime = 0;
							audio3.currentTime = 0;

				  	}, 1500);
					}, 1500);
			}, 250); 	
  	
	  
		} else {

			
		  
			setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move1).text() + '.');
			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It hit for ' + num + ' damage.');
				  	enemyHealth.text(pokeEnemy.health + '/1000');
				  		setTimeout( function() {
						  	let rand = _.random(1,4);
						  	let dmg1 = _.random(10, 30);
						  	let dmg2 = _.random(30, 125);
						  	let dmg3 = _.random(75, 250);
						  	let dmg4 = _.random(100, 500);
						  	let chance = _.random(1, 100);

						  	$(combatText).empty();
						
						  	if (rand === 1 && chance <= 80) {

						  		pokePlayer.hit(dmg1);	  

						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250); 

						  		}	else {	

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
									}

						  	} else if (rand === 1 && chance > 80) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	} else if (rand === 2 && chance <= 70) {
						  		pokePlayer.hit(dmg2);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  	}
						  	} else if (rand === 2 && chance > 70) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 3 && chance <= 60) {
						  		pokePlayer.hit(dmg3);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		// $(combatText).append('Enemy ' + $(enemyName).text() + ' hit you with ' + $(move1).text() + ' for ' + dmg1 + ' damage! It was super effective...' )
							  		// playerHealth.text(pokePlayer.health + '/1000');
							  	}
						  	} else if (rand === 3 && chance > 60) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 4 && chance <= 50) {
						  		pokePlayer.hit(dmg4);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		// $(combatText).append('Enemy ' + $(enemyName).text() + ' hit you with ' + $(move1).text() + ' for ' + dmg1 + ' damage! It was super effective...' )
							  		// playerHealth.text(pokePlayer.health + '/1000');
							  	}
						  	} else if (rand === 4 && chance > 50) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	}
						  	
						  }, 1500);
					 }, 1500);
				}, 250);

		}

	} else {
		enemyHealth.text(pokeEnemy.health + '/1000');


		if (pokeEnemy.health <= 0) {

  		setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move1).text() + '.');

			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It missed.');

				  	setTimeout( function() {
				  		enemyHealth.text('FNT/1000');
  						alert("Enemy Trainer's pokemon fainted... You won! Press the 'Home' button to start a new game!");
  						audio1.pause();
  						audio2.pause();
							audio3.play();
							audio1.currentTime = 0;
							audio2.currentTime = 0;
							audio3.currentTime = 0;

				  	}, 1500);
					}, 1500);
			}, 250); 	 	
  
	  
		} else {

		  setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move1).text() + '.');

			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It missed.');

				  	setTimeout( function() {
						  	let rand = _.random(1,4);
						  	let dmg1 = _.random(10, 30);
						  	let dmg2 = _.random(30, 125);
						  	let dmg3 = _.random(75, 250);
						  	let dmg4 = _.random(100, 500);
						  	let chance = _.random(1, 100);

						  	$(combatText).empty();
						
						  	if (rand === 1 && chance <= 80) {

						  		pokePlayer.hit(dmg1);	  

						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250); 

						  		}	else {	

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
									}

						  	} else if (rand === 1 && chance > 80) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	} else if (rand === 2 && chance <= 70) {
						  		pokePlayer.hit(dmg2);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		
							  	}
						  	} else if (rand === 2 && chance > 70) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 3 && chance <= 60) {
						  		pokePlayer.hit(dmg3);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  	
							  	}
						  	} else if (rand === 3 && chance > 60) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 4 && chance <= 50) {
						  		pokePlayer.hit(dmg4);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		
							  	}
						  	} else if (rand === 4 && chance > 50) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	}
						  	
						  }, 1500);
				  	
					}, 1500);
			}, 250); 	

		  

		}
	}

});


// Click Move2 Function to hit enemy and display results
move2.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(20, 100);
	let chance = _.random(1,100);

	if (chance <= 70) {
		pokeEnemy.hit(num);
		

		if (pokeEnemy.health <= 0) {
			setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move2).text() + '.');
		  	
			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It hit for ' + num + ' damage.');

				  	setTimeout( function() {
				  		enemyHealth.text('FNT/1000');
  						alert("Enemy Trainer's pokemon fainted... You won! Press the 'Home' button to start a new game!");
  						audio1.pause();
  						audio2.pause();
							audio3.play();
							audio1.currentTime = 0;
							audio2.currentTime = 0;
							audio3.currentTime = 0;

				  	}, 1500);
					}, 1500);
			}, 250); 	
  	
	  
		} else {			
		  
			setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move2).text() + '.');
			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It hit for ' + num + ' damage.');
				  	enemyHealth.text(pokeEnemy.health + '/1000');
				  		setTimeout( function() {
						  	let rand = _.random(1,4);
						  	let dmg1 = _.random(10, 30);
						  	let dmg2 = _.random(30, 125);
						  	let dmg3 = _.random(75, 250);
						  	let dmg4 = _.random(100, 500);
						  	let chance = _.random(1, 100);

						  	$(combatText).empty();
						
						  	if (rand === 1 && chance <= 80) {

						  		pokePlayer.hit(dmg1);	  

						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250); 

						  		}	else {	

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
									}

						  	} else if (rand === 1 && chance > 80) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	} else if (rand === 2 && chance <= 70) {
						  		pokePlayer.hit(dmg2);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  	}
						  	} else if (rand === 2 && chance > 70) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 3 && chance <= 60) {
						  		pokePlayer.hit(dmg3);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		// $(combatText).append('Enemy ' + $(enemyName).text() + ' hit you with ' + $(move1).text() + ' for ' + dmg1 + ' damage! It was super effective...' )
							  		// playerHealth.text(pokePlayer.health + '/1000');
							  	}
						  	} else if (rand === 3 && chance > 60) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 4 && chance <= 50) {
						  		pokePlayer.hit(dmg4);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		// $(combatText).append('Enemy ' + $(enemyName).text() + ' hit you with ' + $(move1).text() + ' for ' + dmg1 + ' damage! It was super effective...' )
							  		// playerHealth.text(pokePlayer.health + '/1000');
							  	}
						  	} else if (rand === 4 && chance > 50) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	}
						  	
						  }, 1500);
					 }, 1500);
				}, 250);

		}

	} else {
		enemyHealth.text(pokeEnemy.health + '/1000');

		if (pokeEnemy.health <= 0) {

  		setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move2).text() + '.');

			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It missed.');

				  	setTimeout( function() {
				  		enemyHealth.text('FNT/1000');
  						alert("Enemy Trainer's pokemon fainted... You won! Press the 'Home' button to start a new game!");
  						audio1.pause();
  						audio2.pause();
							audio3.play();
							audio1.currentTime = 0;
							audio2.currentTime = 0;
							audio3.currentTime = 0;

				  	}, 1500);
					}, 1500);
			}, 250); 	 	
  
	  
		} else {

		  setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move2).text() + '.');

			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It missed.');

				  	setTimeout( function() {
						  	let rand = _.random(1,4);
						  	let dmg1 = _.random(10, 30);
						  	let dmg2 = _.random(30, 125);
						  	let dmg3 = _.random(75, 250);
						  	let dmg4 = _.random(100, 500);
						  	let chance = _.random(1, 100);

						  	$(combatText).empty();
						
						  	if (rand === 1 && chance <= 80) {

						  		pokePlayer.hit(dmg1);	  

						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250); 

						  		}	else {	

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
									}

						  	} else if (rand === 1 && chance > 80) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0].text() + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	} else if (rand === 2 && chance <= 70) {
						  		pokePlayer.hit(dmg2);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		
							  	}
						  	} else if (rand === 2 && chance > 70) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 3 && chance <= 60) {
						  		pokePlayer.hit(dmg3);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  	
							  	}
						  	} else if (rand === 3 && chance > 60) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 4 && chance <= 50) {
						  		pokePlayer.hit(dmg4);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		
							  	}
						  	} else if (rand === 4 && chance > 50) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	}
						  	
						  }, 1500);
				  	
					}, 1500);
			}, 250); 	

		  

		}
	}
  
  
});

// Click Move3 Function to hit enemy and display results
move3.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(50, 200);
  let chance = _.random(1,100);

	if (chance <= 60) {
		pokeEnemy.hit(num);
		

		if (pokeEnemy.health <= 0) {
			setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move3).text() + '.');
		  	
			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It hit for ' + num + ' damage.');

				  	setTimeout( function() {
				  		enemyHealth.text('FNT/1000');
  						alert("Enemy Trainer's pokemon fainted... You won! Press the 'Home' button to start a new game!");
  						audio1.pause();
  						audio2.pause();
							audio3.play();
							audio1.currentTime = 0;
							audio2.currentTime = 0;
							audio3.currentTime = 0;

				  	}, 1500);
					}, 1500);
			}, 250); 	
  	
	  
		} else {
		  
			setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move3).text() + '.');
			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It hit for ' + num + ' damage.');
				  	enemyHealth.text(pokeEnemy.health + '/1000');
				  		setTimeout( function() {
						  	let rand = _.random(1,4);
						  	let dmg1 = _.random(10, 30);
						  	let dmg2 = _.random(30, 125);
						  	let dmg3 = _.random(75, 250);
						  	let dmg4 = _.random(100, 500);
						  	let chance = _.random(1, 100);

						  	$(combatText).empty();
						
						  	if (rand === 1 && chance <= 80) {

						  		pokePlayer.hit(dmg1);	  

						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250); 

						  		}	else {	

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
									}

						  	} else if (rand === 1 && chance > 80) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	} else if (rand === 2 && chance <= 70) {
						  		pokePlayer.hit(dmg2);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  	}
						  	} else if (rand === 2 && chance > 70) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 3 && chance <= 60) {
						  		pokePlayer.hit(dmg3);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		// $(combatText).append('Enemy ' + $(enemyName).text() + ' hit you with ' + $(move1).text() + ' for ' + dmg1 + ' damage! It was super effective...' )
							  		// playerHealth.text(pokePlayer.health + '/1000');
							  	}
						  	} else if (rand === 3 && chance > 60) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 4 && chance <= 50) {
						  		pokePlayer.hit(dmg4);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		// $(combatText).append('Enemy ' + $(enemyName).text() + ' hit you with ' + $(move1).text() + ' for ' + dmg1 + ' damage! It was super effective...' )
							  		// playerHealth.text(pokePlayer.health + '/1000');
							  	}
						  	} else if (rand === 4 && chance > 50) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	}
						  	
						  }, 1500);
					 }, 1500);
				}, 250);

		}

	} else {
		enemyHealth.text(pokeEnemy.health + '/1000');

		if (pokeEnemy.health <= 0) {

  		setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move3).text() + '.');

			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It missed.');

				  	setTimeout( function() {
				  		enemyHealth.text('FNT/1000');
  						alert("Enemy Trainer's pokemon fainted... You won! Press the 'Home' button to start a new game!");
  						audio1.pause();
  						audio2.pause();
							audio3.play();
							audio1.currentTime = 0;
							audio2.currentTime = 0;
							audio3.currentTime = 0;

				  	}, 1500);
					}, 1500);
			}, 250); 	 	
  
	  
		} else {

		  setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move3).text() + '.');

			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It missed.');

				  	setTimeout( function() {
						  	let rand = _.random(1,4);
						  	let dmg1 = _.random(10, 30);
						  	let dmg2 = _.random(30, 125);
						  	let dmg3 = _.random(75, 250);
						  	let dmg4 = _.random(100, 500);
						  	let chance = _.random(1, 100);

						  	$(combatText).empty();
						
						  	if (rand === 1 && chance <= 80) {

						  		pokePlayer.hit(dmg1);	  

						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250); 

						  		}	else {	

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
									}

						  	} else if (rand === 1 && chance > 80) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0].text() + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	} else if (rand === 2 && chance <= 70) {
						  		pokePlayer.hit(dmg2);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		
							  	}
						  	} else if (rand === 2 && chance > 70) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 3 && chance <= 60) {
						  		pokePlayer.hit(dmg3);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  	
							  	}
						  	} else if (rand === 3 && chance > 60) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 4 && chance <= 50) {
						  		pokePlayer.hit(dmg4);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		
							  	}
						  	} else if (rand === 4 && chance > 50) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	}
						  	
						  }, 1500);
				  	
					}, 1500);
			}, 250); 	

		  

		}
	}
});

// Click Move4 Function to hit enemy and display results
move4.on('click', function() {

	// Generate random number to hit enemy health
	let num = _.random(100, 500);
  let chance = _.random(1,100);

	if (chance <= 50) {
		pokeEnemy.hit(num);
		

		if (pokeEnemy.health <= 0) {
			setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move4).text() + '.');
		  	
			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It hit for ' + num + ' damage.');

				  	setTimeout( function() {
				  		enemyHealth.text('FNT/1000');
  						alert("Enemy Trainer's pokemon fainted... You won! Press the 'Home' button to start a new game!");
  						audio1.pause();
  						audio2.pause();
							audio3.play();
							audio1.currentTime = 0;
							audio2.currentTime = 0;
							audio3.currentTime = 0;

				  	}, 1500);
					}, 1500);
			}, 250); 	
  	
	  
		} else {

			
		  
			setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move4).text() + '.');
			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It hit for ' + num + ' damage.');
				  	enemyHealth.text(pokeEnemy.health + '/1000');
				  		setTimeout( function() {
						  	let rand = _.random(1,4);
						  	let dmg1 = _.random(10, 30);
						  	let dmg2 = _.random(30, 125);
						  	let dmg3 = _.random(75, 250);
						  	let dmg4 = _.random(100, 500);
						  	let chance = _.random(1, 100);

						  	$(combatText).empty();
						
						  	if (rand === 1 && chance <= 80) {

						  		pokePlayer.hit(dmg1);	  

						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250); 

						  		}	else {	

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
									}

						  	} else if (rand === 1 && chance > 80) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	} else if (rand === 2 && chance <= 70) {
						  		pokePlayer.hit(dmg2);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  	}
						  	} else if (rand === 2 && chance > 70) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 3 && chance <= 60) {
						  		pokePlayer.hit(dmg3);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		// $(combatText).append('Enemy ' + $(enemyName).text() + ' hit you with ' + $(move1).text() + ' for ' + dmg1 + ' damage! It was super effective...' )
							  		// playerHealth.text(pokePlayer.health + '/1000');
							  	}
						  	} else if (rand === 3 && chance > 60) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 4 && chance <= 50) {
						  		pokePlayer.hit(dmg4);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		// $(combatText).append('Enemy ' + $(enemyName).text() + ' hit you with ' + $(move1).text() + ' for ' + dmg1 + ' damage! It was super effective...' )
							  		// playerHealth.text(pokePlayer.health + '/1000');
							  	}
						  	} else if (rand === 4 && chance > 50) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	}
						  	
						  }, 1500);
					 }, 1500);
				}, 250);

		}

	} else {
		enemyHealth.text(pokeEnemy.health + '/1000');

		if (pokeEnemy.health <= 0) {

  		setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move4).text() + '.');

			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It missed.');

				  	setTimeout( function() {
				  		enemyHealth.text('FNT/1000');
  						alert("Enemy Trainer's pokemon fainted... You won! Press the 'Home' button to start a new game!");
  						audio1.pause();
  						audio2.pause();
							audio3.play();
							audio1.currentTime = 0;
							audio2.currentTime = 0;
							audio3.currentTime = 0;

				  	}, 1500);
					}, 1500);
			}, 250); 	 	
  
	  
		} else {

		  setTimeout( function() {
		  	$(combatText).empty();
		  	$(combatText).append($(playerName).text() + ' used ' + $(move4).text() + '.');

			  	setTimeout( function() {
				  	$(combatText).empty();
				  	$(combatText).append('It missed.');

				  	setTimeout( function() {
						  	let rand = _.random(1,4);
						  	let dmg1 = _.random(10, 30);
						  	let dmg2 = _.random(30, 125);
						  	let dmg3 = _.random(75, 250);
						  	let dmg4 = _.random(100, 500);
						  	let chance = _.random(1, 100);

						  	$(combatText).empty();
						
						  	if (rand === 1 && chance <= 80) {

						  		pokePlayer.hit(dmg1);	  

						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250); 

						  		}	else {	

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg1 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
									}

						  	} else if (rand === 1 && chance > 80) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[0].text() + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	} else if (rand === 2 && chance <= 70) {
						  		pokePlayer.hit(dmg2);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg2 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		
							  	}
						  	} else if (rand === 2 && chance > 70) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[1] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 3 && chance <= 60) {
						  		pokePlayer.hit(dmg3);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg3 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  	
							  	}
						  	} else if (rand === 3 && chance > 60) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[2] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 		  	


						  	} else if (rand === 4 && chance <= 50) {
						  		pokePlayer.hit(dmg4);
						  		
						  		if (pokePlayer.health <= 0) {

						  			setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');

											  	setTimeout( function() {
											  		enemyHealth.text('FNT/1000');
							  						alert($(playerName).text() + " has fainted. You are out of Pokemon! Press the 'home' button to start a new game!");

											  	}, 1500);
												}, 1500);
										}, 250);

						  		}	else {	
						  		
							  		setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It hit for ' + dmg4 + ' damage.');
											  	playerHealth.text(pokePlayer.health + '/1000');		

												}, 1500);
										}, 250);
						  		
							  		
							  	}
						  	} else if (rand === 4 && chance > 50) {

							  	setTimeout( function() {
									  	$(combatText).empty();
									  	$(combatText).append('The opposing ' + $(enemyName).text() + ' used ' + eMoveset[3] + '.');

										  	setTimeout( function() {
											  	$(combatText).empty();
											  	$(combatText).append('It missed.');
											  	playerHealth.text(pokePlayer.health + '/1000');

												}, 1500);
										}, 250); 	  	


						  	}
						  	
						  }, 1500);
				  	
					}, 1500);
			}, 250); 	

		  

		}
	}
  
});

