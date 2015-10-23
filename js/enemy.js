let Enemy = function() {
	this.health = 1000;
	this.hit = function(num) {
		let hitPoints = num;
		return this.health = this.health - hitPoints;
	};
};
export default Enemy;