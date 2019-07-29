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
			for (let i = 0; i < this.gameSet.p.moveSequence.length; i++) {
				let action = this.gameSet.p.moveSequence[i];
				switch(action) {
					case 'A':
						if (this.gameSet.p.o === 'N') {
							this.gameSet.p.moveUp(this.gameSet);
						} else if (this.gameSet.p.o === 'E') {
							this.gameSet.p.moveRight(this.gameSet);
						} else if (this.gameSet.p.o === 'S') {
							this.gameSet.p.moveDown(this.gameSet);
						} else if (this.gameSet.p.o === 'O') {
							this.gameSet.p.moveLeft(this.gameSet);
						} else {
							console.error('Unable to set direction to move to.');
						}
						break;
					case 'D':
						this.gameSet.p.turnRight();
						break;
					case 'G':
						this.gameSet.p.turnLeft();
						break;
				}
				console.log(action);
				this.$forceUpdate();
			}
		}
	}
});

