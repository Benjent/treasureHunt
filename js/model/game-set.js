/**
 * Class representing the set of the exploring game.
 */
class GameSet {
	/**
	 * Create the set of the exploring game.
	 * @constructor
	 * @param {MadreDeDiosMap} map - The map to explore.
	 * @param {Array} mountains - The list of the mountains on the map.
	 * @param {Array} treasureSpots - The list of the treasure spots on the map.
	 * @param {Array} adventurers - The list of the adventurers exploring the map.
	 */
	constructor(map, mountains, treasureSpots, adventurers) {
		if (isNil(map) || isNil(mountains) || isNil(treasureSpots) || isNil(adventurers)) {
			throw new TypeError('Class "GameSet" cannot be instanciated with nil properties.');
		}

		this.map = map;
		this.mountains = mountains.splice(0);
		this.treasureSpots = treasureSpots.splice(0);
		this.adventurers = adventurers.splice(0);
		this.board = [];
		this.adventurerTurn = 0;
	}
	/**
	 * Initialize the map by putting code letters in the grid squares to form a visual.
	 */
	init() {
		for (let y = 0; y < this.map.height; y++) {
			this.board[y] = [];

			for (let x = 0; x < this.map.width; x++) {
				const row = this.board[y];

				// Set land by default
				row[x] = SQUARE.X;

				// Set mountains
				for (let m = 0; m < this.mountains.length; m++) {
					if (this.mountains[m].x === x && this.mountains[m].y === y) {
						row[x] = SQUARE.M;
					}
				}

				// Set treasure spots
				for (let ts = 0; ts < this.treasureSpots.length; ts++) {
					if (this.treasureSpots[ts].x === x && this.treasureSpots[ts].y === y) {
						row[x] = this.treasureSpots[ts].chestsNumber;
					}
				}

				// Set adventurers
				for (let a = 0; a < this.adventurers.length; a++) {
					if (this.adventurers[a].x === x && this.adventurers[a].y === y) {
						row[x] = this.adventurers[a].name;
					}
				}
			}
		}
	}
	/**
	 * Get the treasure spot that matches the given coordinates.
	 * @param {number} x - The horizontal axis coordinate.
	 * @param {number} y - The vertical axis coordinate.
	 * @return {TreasureSpot} The matching treasure spot.
	 */
	getTreasureSpotByCoordinates(x, y) {
		for (let i = 0; i < this.treasureSpots.length; i++) {
			const ts = this.treasureSpots[i];
			if (ts.x === x && ts.y === y) {
				return this.treasureSpots[i];
			}
		}
	}
}