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

		if (isNil(n)) {
			throw new TypeError('Class "TreasureSpot" cannot be instanciated with nil properties.');
		}
		
		const parsedN = parseInt(n, 10);
		if (parsedN < 0) {
			throw new TypeError('Class "TreasureSpot" chests number must be positive.');
		}
		this.chestsNumber = parsedN;
	}
}