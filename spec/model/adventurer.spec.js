describe('Testing class "Adventurer"', () => {
	const C = new MadreDeDiosMap(3, 3);

	it('should throw an error trying to instantiate (wrong orientation)', () => {
		function createAdventurer() {
			new Adventurer('Champion', 1, 1, 'F', 'AAA');
		}
		expect(createAdventurer).toThrow(new TypeError('Class "Adventurer" cannot be instanciated with unknown orientation.'));
	})

	it('should throw an error trying to instantiate (wrong action in move sequence)', () => {
		function createAdventurer() {
			new Adventurer('Champion', 1, 1, 'N', 'ABC');
		}
		expect(createAdventurer).toThrow(new TypeError('Class "Adventurer" cannot be instanciated with unknown moves.'));
	})

	it('should set the correct orientation when turning left', () => {
		const adventurer = new Adventurer('Champion', 4, 4, ORIENTATION.N, 'AAA');
		adventurer.turnLeft();
		expect(adventurer.o).toEqual(ORIENTATION.O);
		adventurer.turnLeft();
		expect(adventurer.o).toEqual(ORIENTATION.S);
		adventurer.turnLeft();
		expect(adventurer.o).toEqual(ORIENTATION.E);
		adventurer.turnLeft();
		expect(adventurer.o).toEqual(ORIENTATION.N);
	})

	it('should set the correct orientation when turning right', () => {
		const adventurer = new Adventurer('Champion', 4, 4, ORIENTATION.S, 'AAA');
		adventurer.turnRight();
		expect(adventurer.o).toEqual(ORIENTATION.O);
		adventurer.turnRight();
		expect(adventurer.o).toEqual(ORIENTATION.N);
		adventurer.turnRight();
		expect(adventurer.o).toEqual(ORIENTATION.E);
		adventurer.turnRight();
		expect(adventurer.o).toEqual(ORIENTATION.S);
	})

	it('should remove the root action from the move sequence when it is performed', () => {
		const adventurer = new Adventurer('Champion', 4, 4, ORIENTATION.S, 'ADAGA');
		adventurer.deleteMoveFromSequence();
		expect(adventurer.moveSequence).toEqual('DAGA');
	})

	describe('Move methods', () => {
		let M = null;
		let TS = null;
		let A = null;
		let gameSet = null;
		beforeEach(() => {
			M = new Mountain(0, 0);
			TS = new TreasureSpot(0, 1, 1);
			A = new Adventurer('Benjent', 1, 1, ORIENTATION.N, 'AAA');
			gameSet = new GameSet(C, [M], [TS], [A]);
		})

		it('should move to the correct direction (up) and remove the action from the sequence', () => {
			gameSet.init();
			spyOn(A, "deleteMoveFromSequence");

			A.moveUp(gameSet);
			expect(A.deleteMoveFromSequence).toHaveBeenCalled();
			expect(A.x).toEqual(1);
			expect(A.y).toEqual(0);
		})

		it('should move to the correct direction (right) and remove the action from the sequence', () => {
			gameSet.init();
			spyOn(A, "deleteMoveFromSequence");

			A.moveRight(gameSet);
			expect(A.deleteMoveFromSequence).toHaveBeenCalled();
			expect(A.x).toEqual(2);
			expect(A.y).toEqual(1);
		})

		it('should move to the correct direction (down) and remove the action from the sequence', () => {
			gameSet.init();
			spyOn(A, "deleteMoveFromSequence");

			A.moveDown(gameSet);
			expect(A.deleteMoveFromSequence).toHaveBeenCalled();
			expect(A.x).toEqual(1);
			expect(A.y).toEqual(2);
		})

		it('should move to the correct direction (left) and remove the action from the sequence', () => {
			gameSet.init();
			spyOn(A, "deleteMoveFromSequence");

			A.moveLeft(gameSet);
			expect(A.deleteMoveFromSequence).toHaveBeenCalled();
			expect(A.x).toEqual(0);
			expect(A.y).toEqual(1);
		})
	})
})
