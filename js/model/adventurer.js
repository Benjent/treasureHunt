class Adventurer extends Coordinates {
	constructor(x, y, o, name, moveSequence) {
		super(x, y);
		this.o = o;
		this.name = name;
		this.moveSequence = moveSequence;
		this.loot = 0;
	}
	turnLeft() {
		switch(this.o) {
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
	}
	turnRight() {
		switch(this.o) {
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
	}
	moveUp(gameSet) {
		const canMove = !gameSet.map.isOutOfBounds(this.x, this.y - 1) && gameSet.board[this.y - 1][this.x] !== 'M';
		if (canMove) {
			if (gameSet.board[this.y][this.x] === 'A') {
				gameSet.board[this.y][this.x] = 'X'; // Only leave X if there was no treasure
			}
			// Check for treasure
			if (gameSet.board[this.y - 1][this.x] > 0) {
				this.loot++;
				gameSet.board[this.y - 1][this.x]--;
			} else if (gameSet.board[this.y - 1][this.x] !== 0) {
				gameSet.board[this.y - 1][this.x] = 'A';
			}
			this.y = this.y - 1;
		} else {
			console.error('Unable to move up.');
		}
		return;
	}
	moveRight(gameSet) {
		const canMove = !gameSet.map.isOutOfBounds(this.x + 1, this.y) && gameSet.board[this.y][this.x + 1] !== 'M';
		if (canMove) {
			if (gameSet.board[this.y][this.x] === 'A') {
				gameSet.board[this.y][this.x] = 'X'; // Only leave X if there was no treasure
			}
			// Check for treasure
			if (gameSet.board[this.y][this.x + 1] > 0) {
				this.loot++;
				gameSet.board[this.y][this.x + 1]--;
			} else if (gameSet.board[this.y][this.x + 1] !== 0) {
				gameSet.board[this.y][this.x + 1] = 'A';
			}
			this.x = this.x + 1;
		} else {
			console.error('Unable to move right.');
		}
		return;
	}
	moveDown(gameSet) {
		const canMove = !gameSet.map.isOutOfBounds(this.x, this.y + 1) && gameSet.board[this.y + 1][this.x] !== 'M';
		if (canMove) {
			if (gameSet.board[this.y][this.x] === 'A') {
				gameSet.board[this.y][this.x] = 'X'; // Only leave X if there was no treasure
			}
			// Check for treasure
			if (gameSet.board[this.y + 1][this.x] > 0) {
				this.loot++;
				gameSet.board[this.y + 1][this.x]--;
			} else if (gameSet.board[this.y + 1][this.x] !== 0) {
				gameSet.board[this.y + 1][this.x] = 'A';
			}
			this.y = this.y + 1;
		} else {
			console.error('Unable to move down.');
		}
		return;
	}
	moveLeft(gameSet) {
		const canMove = !gameSet.map.isOutOfBounds(this.x - 1, this.y) && gameSet.board[this.y][this.x - 1] !== 'M';
		if (canMove) {
			if (gameSet.board[this.y][this.x] === 'A') {
				gameSet.board[this.y][this.x] = 'X'; // Only leave X if there was no treasure
			}
			// Check for treasure
			if (gameSet.board[this.y][this.x - 1] > 0) {
				this.loot++;
				gameSet.board[this.y][this.x - 1]--;
			} else if (gameSet.board[this.y][this.x - 1] !== 0) {
				gameSet.board[this.y][this.x - 1] = 'A';
			}
			this.x = this.x - 1;
		} else {
			console.error('Unable to move left.');
		}
		return;
	}
	// loot(gameSet, coordinates) {
	// 	this.loot++; // Notify self
	// 	newPosition--; // Notify game
	// }
}