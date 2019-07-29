class GameSet {
	constructor(map, mountains, treasureSpots, adventurers) {
		this.map = map;
		this.mountains = mountains.splice(0);
		this.treasureSpots = treasureSpots.splice(0);
		// this.adventurers = adventurers.splice(0);
		this.p = null;// focus on one player for now
		this.board = [];
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
			}
		}
		// TODO below is hard-coded, make it dynamic
		// this.board[1][1] = 'M';
		// this.board[2][2] = 'M';
		// this.board[3][3] = 'M';
		// this.board[4][4] = 2;
		this.board[9][9] = 'A';
	}
}