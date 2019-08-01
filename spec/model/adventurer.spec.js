describe('Testing class "Adventurer"', () => {
	const C = new MadreDeDiosMap(3, 3);

	it('should set the correct orientation when turning left', () => {
		const adventurer = new Adventurer('Champion', 4, 4, 'N', 'AAA');
		adventurer.turnLeft();
		expect(adventurer.o).toEqual('O');
		adventurer.turnLeft();
		expect(adventurer.o).toEqual('S');
		adventurer.turnLeft();
		expect(adventurer.o).toEqual('E');
		adventurer.turnLeft();
		expect(adventurer.o).toEqual('N');
	})

	it('should set the correct orientation when turning right', () => {
		const adventurer = new Adventurer('Champion', 4, 4, 'S', 'AAA');
		adventurer.turnRight();
		expect(adventurer.o).toEqual('O');
		adventurer.turnRight();
		expect(adventurer.o).toEqual('N');
		adventurer.turnRight();
		expect(adventurer.o).toEqual('E');
		adventurer.turnRight();
		expect(adventurer.o).toEqual('S');
	})

	it('should remove the root action from the move sequence when it is performed', () => {
		const adventurer = new Adventurer('Champion', 4, 4, 'S', 'ADAGA');
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
			A = new Adventurer('Benjent', 1, 1, 'N', 'AAA');
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
