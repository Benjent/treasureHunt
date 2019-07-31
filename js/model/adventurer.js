/**
 * Class representing an adventurer.
 * @extends Coordinates
 */
class Adventurer extends Coordinates {
	/**
	 * Create an adventurer.
	 * @constructor
	 * @param {string} name - The name of the adventurer.
	 * @param {number} x - The horizontal axis coordinate.
	 * @param {number} y - The vertical axis coordinate.
	 * @param {string} o - The orientation of the adventurer.
	 * @param {string} moveSequence - The sequence of moves of the adventurer throughout the map exploration.
	 */
	constructor(name, x, y, o, moveSequence) {
		super(x, y);
		this.name = name;
		this.o = o;
		this.moveSequence = moveSequence;
		this.loot = 0;
	}
	/**
	 * Set the orientation of the adventurer to the next cardinal direction counter-clockwise.
	 * Then remove the performed move.
	 */
	turnLeft() {
		switch (this.o) {
			case 'N':
				this.o = 'O';
				break;
			case 'E':
				this.o = 'N';
				break;
			case 'S':
				this.o = 'E';
				break;
			case 'O':
				this.o = 'S';
				break;
		}
		this.deleteMoveFromSequence();
	}
	/**
	 * Set the orientation of the adventurer to the next cardinal direction clockwise.
	 * Then remove the performed move.
	 */
	turnRight() {
		switch (this.o) {
			case 'N':
				this.o = 'E';
				break;
			case 'E':
				this.o = 'S';
				break;
			case 'S':
				this.o = 'O';
				break;
			case 'O':
				this.o = 'N';
				break;
		}
		this.deleteMoveFromSequence();
	}
	/**
	 * Set the position of the adventurer to the square above the current position if it is passable.
	 * Then remove the performed move.
	 * @param {GameSet} gameSet - The set of the exploration game.
	 */
	moveUp(gameSet) {
		const isOutOfBounds = gameSet.map.isOutOfBounds(this.x, this.y - 1);
		if (isOutOfBounds) {
			console.error(`Unable to move up for ${this.name} (out of bounds).`);
		} else {
			const canMove = this.isSquareFree(gameSet.board, this.y - 1, this.x);
			if (!canMove) {
				console.error(`Unable to move up for ${this.name} (mountain or adventurer on the way).`);
			} else {
				this.markSquare(gameSet, this.y - 1, this.x);
				this.y = this.y - 1;
			}
		}
		this.deleteMoveFromSequence();
	}
	/**
	 * Set the position of the adventurer to the square on the right of the current position if it is passable.
	 * Then remove the performed move.
	 * @param {GameSet} gameSet - The set of the exploration game.
	 */
	moveRight(gameSet) {
		const isOutOfBounds = gameSet.map.isOutOfBounds(this.x + 1, this.y);
		if (isOutOfBounds) {
			console.error(`Unable to move right for ${this.name} (out of bounds).`);
		} else {
			const canMove = this.isSquareFree(gameSet.board, this.y, this.x + 1);
			if (!canMove) {
				console.error(`Unable to move right for ${this.name} (mountain or adventurer on the way).`);
			} else {
				this.markSquare(gameSet, this.y, this.x + 1);
				this.x = this.x + 1;
			}
		}
		this.deleteMoveFromSequence();
	}
	/**
	 * Set the position of the adventurer to the square below the current position if it is passable.
	 * Then remove the performed move.
	 * @param {GameSet} gameSet - The set of the exploration game.
	 */
	moveDown(gameSet) {
		const isOutOfBounds = gameSet.map.isOutOfBounds(this.x, this.y + 1);
		if (isOutOfBounds) {
			console.error(`Unable to move down for ${this.name} (out of bounds).`);
		} else {
			const canMove = this.isSquareFree(gameSet.board, this.y + 1, this.x);
			if (!canMove) {
				console.error(`Unable to move down for ${this.name} (mountain or adventurer on the way).`);
			} else {
				this.markSquare(gameSet, this.y + 1, this.x);
				this.y = this.y + 1;
			}
		}
		this.deleteMoveFromSequence();
	}
	/**
	 * Set the position of the adventurer to the square on the left of the current position if it is passable.
	 * Then remove the performed move.
	 * @param {GameSet} gameSet - The set of the exploration game.
	 */
	moveLeft(gameSet) {
		const isOutOfBounds = gameSet.map.isOutOfBounds(this.x - 1, this.y);
		if (isOutOfBounds) {
			console.error(`Unable to move left for ${this.name} (out of bounds).`);
		} else {
			const canMove = this.isSquareFree(gameSet.board, this.y, this.x - 1);
			if (!canMove) {
				console.error(`Unable to move left for ${this.name} (mountain or adventurer on the way).`);
			} else {
				this.markSquare(gameSet, this.y, this.x - 1);
				this.x = this.x - 1;
			}
		}
		this.deleteMoveFromSequence();
	}
	/**
	 * Remove the action at the root of the motion sequence of the adventurer.
	 */
	deleteMoveFromSequence() {
		this.moveSequence = this.moveSequence.substring(1);
	}
	/**
	 * Remove the action at the root of the motion sequence of the adventurer.
	 * @param {object} board - The gridmap of the set of the exploration game.
	 * @param {number} row - The vertical axis coordinate.
	 * @param {number} col - The horizontal axis coordinate.
	 * @return {boolean} True if the square is passable.
	 */
	isSquareFree(board, row, col) {
		const square = board[row][col];
		const isOnAMountain = square === 'M';
		const isEncounteringAnAdventurer = typeof square === 'string' && square !== 'M' && square !== 'X';
		return !isOnAMountain && !isEncounteringAnAdventurer;
	}
	/**
	 * Leave a "passable" mark on the square where the adventurer used to be if it was not a treasure spot.
	 * @param {object} board - The gridmap of the set of the exploration game.
	 */
	unmarkPreviousSquare(board) {
		// If the square holds a name, it is not a treasure spot
		if (board[this.y][this.x] === this.name) {
			board[this.y][this.x] = 'X';
		}
	}
	/**
	 * Leave the name of the adventurer as a mark on the square where the it stands if it is not a treasure spot.
	 * If the square is a treasure spot and holds at least one chest, the adventurer loots a chest.
	 * @param {GameSet} gameSet - The set of the exploration game.
	 * @param {number} row - The vertical axis coordinate.
	 * @param {number} col - The horizontal axis coordinate.
	 */
	markSquare(gameSet, row, col) {
		const board = gameSet.board;
		this.unmarkPreviousSquare(board);
		
		if (board[row][col] > 0) {
			this.lootChest(gameSet, col, row);
		} else if (board[row][col] !== 0) {
			// Regular land
			board[row][col] = this.name;
		}
	}
	/**
	 * Handle the chest that the adventurer loots.
	 * @param {GameSet} gameSet - The set of the exploration game.
	 * @param {number} x - The horizontal axis coordinate.
	 * @param {number} y - The vertical axis coordinate.
	 */
	lootChest(gameSet, x, y) {
		this.loot++;
		const ts = gameSet.getTreasureSpotByCoordinates(x, y);
		ts.chestsNumber--;
		gameSet.board[y][x]--; // Update visual
	}
}