class Adventurer extends Coordinates {
	constructor(name, x, y, o, moveSequence) {
		super(x, y);
		this.name = name;
		this.o = o;
		this.moveSequence = moveSequence;
		this.loot = 0;
	}
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
	moveUp(gameSet) {
		const isOutOfBounds = gameSet.map.isOutOfBounds(this.x, this.y - 1);
		if (isOutOfBounds) {
			console.error(`Unable to move up for ${this.name} (out of bounds).`);
		} else {
			const canMove = this.isSquareFree(gameSet.board, this.y - 1, this.x);
			if (!canMove) {
				console.error(`Unable to move up for ${this.name} (mountain or adventurer on the way).`);
			} else {
				this.markSquare(gameSet.board, this.y - 1, this.x);
				this.y = this.y - 1;
			}
		}
		this.deleteMoveFromSequence();
		return;
	}
	moveRight(gameSet) {
		const isOutOfBounds = gameSet.map.isOutOfBounds(this.x + 1, this.y);
		if (isOutOfBounds) {
			console.error(`Unable to move right for ${this.name} (out of bounds).`);
		} else {
			const canMove = this.isSquareFree(gameSet.board, this.y, this.x + 1);
			if (!canMove) {
				console.error(`Unable to move right for ${this.name} (mountain or adventurer on the way).`);
			} else {
				this.markSquare(gameSet.board, this.y, this.x + 1);
				this.x = this.x + 1;
			}
		}
		this.deleteMoveFromSequence();
		return;
	}
	moveDown(gameSet) {
		const isOutOfBounds = gameSet.map.isOutOfBounds(this.x, this.y + 1);
		if (isOutOfBounds) {
			console.error(`Unable to move down for ${this.name} (out of bounds).`);
		} else {
			const canMove = this.isSquareFree(gameSet.board, this.y + 1, this.x);
			if (!canMove) {
				console.error(`Unable to move down for ${this.name} (mountain or adventurer on the way).`);
			} else {
				this.markSquare(gameSet.board, this.y + 1, this.x);
				this.y = this.y + 1;
			}
		}
		this.deleteMoveFromSequence();
		return;
	}
	moveLeft(gameSet) {
		const isOutOfBounds = gameSet.map.isOutOfBounds(this.x - 1, this.y);
		if (isOutOfBounds) {
			console.error(`Unable to move left for ${this.name} (out of bounds).`);
		} else {
			const canMove = this.isSquareFree(gameSet.board, this.y, this.x - 1);
			if (!canMove) {
				console.error(`Unable to move left for ${this.name} (mountain or adventurer on the way).`);
			} else {
				this.markSquare(gameSet.board, this.y, this.x - 1);
				this.x = this.x - 1;
			}
		}
		this.deleteMoveFromSequence();
		return;
	}
	deleteMoveFromSequence() {
		this.moveSequence = this.moveSequence.substring(1);
	}
	isSquareFree(board, row, col) {
		const isOnAMountain = board[row][col] === 'M';
		// TODO improve check for adventurer
		const isEncounteringAnAdventurer =
			typeof board[row][col] === 'string'
			&& board[row][col] !== 'M'
			&& board[row][col] !== 'X';
		return !isOnAMountain && !isEncounteringAnAdventurer;
	}
	unmarkPreviousSquare(board) {
		if (board[this.y][this.x] === this.name) {
			board[this.y][this.x] = 'X'; // Only leave X if there was no treasure
		}
	}
	markSquare(board, row, col) {
		this.unmarkPreviousSquare(board);
		if (board[row][col] > 0) {
			// Treasure
			this.loot++;
			board[row][col]--;
		} else if (board[row][col] !== 0) {
			// Regular land
			board[row][col] = this.name;
		}
	}
}