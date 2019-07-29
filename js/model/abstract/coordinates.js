class Coordinates {
	constructor(x, y) {
		// Abstract class check
		if (this.constructor === Coordinates) {
			throw new TypeError('Abstract class "Coordinates" cannot be instanciated.');
		}
		this.x = x;
		this.y = y;
	}
}