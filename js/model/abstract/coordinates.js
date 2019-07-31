/** Class representing 2D coordinates. */
class Coordinates {
	/**
	 * Create coordinates.
	 * @constructor
	 * @param {number} x - The horizontal axis coordinate.
	 * @param {number} y - The vertical axis coordinate.
	 */
	constructor(x, y) {
		// Abstract class check
		if (this.constructor === Coordinates) {
			throw new TypeError('Abstract class "Coordinates" cannot be instanciated.');
		}
		this.x = parseInt(x, 10);
		this.y = parseInt(y, 10);
	}
}