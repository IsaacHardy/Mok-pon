(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Enemy = function Enemy() {
	this.health = 1000;
	this.hit = function (num) {
		var hitPoints = num;
		return this.health = this.health - hitPoints;
	};
};
exports["default"] = Enemy;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Player = function Player() {
	this.health = 1000;
	this.hit = function (num) {
		var hitPoints = num;
		return this.health = this.health - hitPoints;
	};
};
exports["default"] = Player;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _enemy = require('./enemy');

var _enemy2 = _interopRequireDefault(_enemy);

(function () {
  'use strict';

  describe('About My Player', function () {

    beforeEach(function () {
      window.x = new _player2['default']();
    });

    describe('creating a player', function () {
      it('should create an instance of player', function () {
        expect(x instanceof _player2['default']).to.equal(true);
      });
    });

    describe('my player health', function () {
      it('should have full health upon creation', function () {
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

  describe('About My Enemy', function () {

    beforeEach(function () {
      window.x = new _enemy2['default']();
    });

    describe('creating a enemy', function () {
      it('should create an instance of enemy', function () {
        expect(x instanceof _enemy2['default']).to.equal(true);
      });
    });

    describe('the enemy health', function () {
      it('should have full health upon creation', function () {
        expect(x.health).to.equal(1000);
      });
    });

    describe('enemy taking damage', function () {
      it('should lower the score, after getting hit', function () {
        x.hit();
        expect(x.health).to.be.below(1000);
      });
    });
  });
})();

},{"./enemy":1,"./player":2}]},{},[3])


//# sourceMappingURL=tests.js.map
