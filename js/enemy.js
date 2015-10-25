let Enemy = function() {
	this.health = 1000;
	this.hit = function(num) {
		let hitPoints = num;
		return this.health = this.health - hitPoints;
	};
	this.resetHealth = function() {
		return this.health = 1000;
	};
};
export default Enemy;