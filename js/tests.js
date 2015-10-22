(function() {
  'use strict';

  describe('About My Player', function() {
  	beforeEach( function() {
  		window.x = new Player();
  	});
  });

  describe('creating a player', function() {
  	it('should create an instance of player', function() {
  		expect(x instanceof Player).to.equal(true);
  	});
  });

}());