/**
 * Class representing a treasure spot.
 * @extends Coordinates
 */
class TreasureSpot extends Coordinates {
	/**
	 * Create a treasure spot.
	 * @constructor
	 * @param {number} x - The horizontal axis coordinate.
	 * @param {number} y - The vertical axis coordinate.
	 * @param {number} n - The number of chests composing the treasure.
	 */
	constructor(x, y, n) {
		super(x, y);
		this.chestsNumber = parseInt(n, 10);
	}
}