/** Class representing 2D coordinates. */
class Coordinates {
	/**
	 * Create coordinates.
	 * @constructor
	 * @param {number} x - The horizontal axis coordinate.
	 * @param {number} y - The vertical axis coordinate.
	 * @throws Will throw an error if directly instanciated
	 */
	constructor(x, y) {
		// Abstract class check
		if (this.constructor === Coordinates) {
			throw new TypeError('Abstract class "Coordinates" cannot be directly instanciated.');
		}

		if (isNil(x) || isNil(y)) {
			throw new TypeError('Abstract class "Coordinates" cannot be instanciated with nil properties.');
		}

		const parsedX = parseInt(x, 10);
		const parsedY = parseInt(y, 10);
		if (isNaN(parsedX) || isNaN(parsedY) || parsedX < 0 || parsedY < 0) {
			throw new TypeError('Abstract class "Coordinates" coordinates must be positive.');
		}
		
		this.x = parsedX;
		this.y = parsedY;
	}
}