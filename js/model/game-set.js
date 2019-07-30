class GameSet {
	constructor(map, mountains, treasureSpots, adventurers) {
		this.map = map;
		this.mountains = mountains.splice(0);
		this.treasureSpots = treasureSpots.splice(0);
		this.adventurers = adventurers.splice(0);
		this.board = [];
		this.adventurerTurn = 0;
	}
	init() {
		for (let y = 0; y < this.map.height; y++) {
			this.board[y] = [];
			for (let x = 0; x < this.map.width; x++) {
				const row = this.board[y];
				// Set land by default
				row[x] = 'X';
				// Set mountains
				for (let m = 0; m < this.mountains.length; m++) {
					if (this.mountains[m].x === x && this.mountains[m].y === y) {
						row[x] = 'M';
					}
				}
				// Set chests
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
}