const app = new Vue({
  el: '#app',
  data: {
    gameSet: gameSet,
  },
	mounted() {
		// Initialize the board
		this.initBoard();
		this.startExploring();
	},
	methods: {
		initBoard() {
			this.gameSet.init();
			this.$forceUpdate();
		},
		startExploring() {
			let hasAnyAdventurerMovesLeft = true;
			while (hasAnyAdventurerMovesLeft) {
				const currentAdventurer = this.gameSet.adventurers[this.gameSet.adventurerTurn];
				let action = currentAdventurer.moveSequence.charAt(0);
				switch (action) {
					case 'A':
						if (currentAdventurer.o === 'N') {
							currentAdventurer.moveUp(this.gameSet);
						} else if (currentAdventurer.o === 'E') {
							currentAdventurer.moveRight(this.gameSet);
						} else if (currentAdventurer.o === 'S') {
							currentAdventurer.moveDown(this.gameSet);
						} else if (currentAdventurer.o === 'O') {
							currentAdventurer.moveLeft(this.gameSet);
						} else {
							console.error('Unable to set direction to move to.');
						}
						break;
					case 'D':
						currentAdventurer.turnRight();
						break;
					case 'G':
						currentAdventurer.turnLeft();
						break;
				}
				// Reset the turn
				if (this.gameSet.adventurerTurn === this.gameSet.adventurers.length - 1) {
					this.gameSet.adventurerTurn = 0;
				} else {
					this.gameSet.adventurerTurn++;
				}
				this.$forceUpdate();
				// Check if adventurer moves are left
				hasAnyAdventurerMovesLeft = false;
				for (let a = 0; a < this.gameSet.adventurers.length; a++) {
					if (this.gameSet.adventurers[a].moveSequence.length > 0) {
						hasAnyAdventurerMovesLeft = true;
						break;
					}
				}
			}
			console.log('fin du game')
		},
		getAdventurerByName(name) {
			for (let a = 0; a < this.gameSet.adventurers.length; a++) {
				if (this.gameSet.adventurers[a].name === name) {
					return this.gameSet.adventurers[a];
				}
			}
		}
	}
});

