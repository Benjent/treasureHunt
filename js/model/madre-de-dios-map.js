/** Class representing a 2D map. */
class MadreDeDiosMap {
	/**
	 * Create a 2D map.
	 * @constructor
	 * @param {number} width - The width of the map (number of squares).
	 * @param {number} height - The height of the map (number of squares).
	 */
	constructor(width, height) {
		this.width = parseInt(width, 10);
		this.height = parseInt(height, 10);
	}
	/**
	 * Tell if the given coordinates are out of the map boundaries.
	 * @param {number} x - The horizontal axis coordinate.
	 * @param {number} y - The vertical axis coordinate.
	 * @return {boolean} True if the coordinates are out of the boundaries.
	 */
	isOutOfBounds(x, y) {
		return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
	}
}