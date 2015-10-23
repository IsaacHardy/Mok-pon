import Player from './player';
import Enemy from './enemy';

(function() {
  'use strict';

describe('About My Player', function() {

  	beforeEach( function() {
  		window.x = new Player();
  	});

  	describe('creating a player', function() {
  		it('should create an instance of player', function() {
  			expect(x instanceof Player).to.equal(true);
  		});
  	});

  	describe('my player health', function() {
      it('should have full health upon creation', function() {
        expect(x.health).to.equal(1000);
      });
    });

    // describe('player taking damage', function() {
    //   it('should lower the score, after getting hit', function() {
    //     x.hit();
    //     expect(x.health).to.be.below(1000);
    //   })
    // });

});

describe('About My Enemy', function() {

  	beforeEach( function() {
  		window.x = new Enemy();
  	});

  	describe('creating a enemy', function() {
  		it('should create an instance of enemy', function() {
  			expect(x instanceof Enemy).to.equal(true);
  		});
  	});

  	describe('the enemy health', function() {
      it('should have full health upon creation', function() {
        expect(x.health).to.equal(1000);
      });
    });

    describe('enemy taking damage', function() {
      it('should lower the score, after getting hit', function() {
        x.hit();
        expect(x.health).to.be.below(1000);
      })
    });

});

  

}());