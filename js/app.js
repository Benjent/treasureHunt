/**
 * The entry point for the app and the core element for Vue.js.
 */
const app = new Vue({
  el: '#app',
  data: {
    gameSet: null,
  },
	methods: {
		/**
		 * Initialize the gameSet through an entry file.
		 * @param {GameSet} gameSet - The set of the exploration game.
		 */
		initBoard(gameSet) {
			this.gameSet = gameSet;
			this.gameSet.init();
			this.$forceUpdate();
		},
		/**
		 * Execute the actions of the adventurers until there is no more actions.
		 * Handle which adventurer goes first.
		 * Then generate an output file.
		 */
		startExploring() {
			let hasAnyAdventurerMovesLeft = true;

			while (hasAnyAdventurerMovesLeft) {
				const currentAdventurer = this.gameSet.adventurers[this.gameSet.adventurerTurn];

				let action = currentAdventurer.moveSequence.charAt(0);
				switch (action) {
					case ACTION.A:
						if (currentAdventurer.o === ORIENTATION.N) {
							currentAdventurer.moveUp(this.gameSet);
						} else if (currentAdventurer.o === ORIENTATION.E) {
							currentAdventurer.moveRight(this.gameSet);
						} else if (currentAdventurer.o === ORIENTATION.S) {
							currentAdventurer.moveDown(this.gameSet);
						} else if (currentAdventurer.o === ORIENTATION.O) {
							currentAdventurer.moveLeft(this.gameSet);
						} else {
							console.error('Unable to set direction to move to.');
						}
						break;
					case ACTION.D:
						currentAdventurer.turnRight();
						break;
					case ACTION.G:
						currentAdventurer.turnLeft();
						break;
					default:
						console.error('Unknown action to perform.');
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
			this.generateOutput();
		},
		/**
		 * Build lines to describe the state of the endgame and assemble them in an output file.
		 * Then suggest the download of the file.
		 */
		generateOutput() {
			// Build map line
			let output = `${MODEL.C}-${this.gameSet.map.width}-${this.gameSet.map.height}\n`;

			// Build mountain lines
			for (let i = 0; i < this.gameSet.mountains.length; i++) {
				let m = this.gameSet.mountains[i];
				output = output.concat(`${MODEL.M}-${m.x}-${m.y}\n`);
			}

			// Build treasure spot lines
			for (let i = 0; i < this.gameSet.treasureSpots.length; i++) {
				let ts = this.gameSet.treasureSpots[i];
				output = output.concat(`${MODEL.T}-${ts.x}-${ts.y}-${ts.chestsNumber}\n`);
			}

			// Build adventurer lines
			for (let i = 0; i < this.gameSet.adventurers.length; i++) {
				let a = this.gameSet.adventurers[i];
				output = output.concat(`${MODEL.A}-${a.name}-${a.x}-${a.y}-${a.o}-${a.loot}\n`);
			}

			this.triggerDownload('results.txt', output);
		},
		/**
		 * Create a browser prompt window to save the file locally.
		 * Then remove the temporary prompt.
		 * @param {string} filename - The name to give to the file to download, including its type.
		 * @param {string} text - The content of the file to download.
		 */
		triggerDownload(filename, text) {
			// Set a download link
			const el = document.createElement('a');
			el.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
			el.setAttribute('download', filename);

			// Create a ghost link and fake-click it
			el.style.display = 'none';
			document.body.appendChild(el);
			el.click();
			document.body.removeChild(el);
		},
		/**
		 * Get the adventurer that matches the given name.
		 * @param {string} name - The name of the adventurer to find.
		 * @return {Adventurer} The matching adventurer.
		 */
		getAdventurerByName(name) {
			for (let a = 0; a < this.gameSet.adventurers.length; a++) {
				if (this.gameSet.adventurers[a].name === name) {
					return this.gameSet.adventurers[a];
				}
			}
		}
	}
});