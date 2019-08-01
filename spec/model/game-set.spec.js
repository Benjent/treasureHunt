describe('Testing class "GameSet"', () => {
	const C = new MadreDeDiosMap(3, 3);
	const M = new Mountain(0, 0);
	const TS = new TreasureSpot(0, 1, 1);
	const A = new Adventurer('Benjent', 1, 1, 'N', 'AAA');

	it('should set the correct squares letters and grid according to the given data', () => {
		const gameSet = new GameSet(C, [M], [TS], [A]); 
		gameSet.init();

		expect(gameSet.board.length).toEqual(3);
		expect(gameSet.board[0].length).toEqual(3);

		// Be careful not to misinterpret x/y coordinates and row/col
		expect(gameSet.board[0][0]).toEqual('M'); // Mountain
		expect(gameSet.board[1][0]).toEqual(1); // Treasure
		expect(gameSet.board[1][1]).toEqual('Benjent'); // Adventurer
		expect(gameSet.board[0][1]).toEqual('X'); // Land
	})

	it('should retrieve the correct treasure spot', () => {
		const gameSet = new GameSet(C, [M], [TS], [A]); 
		gameSet.init();

		const treasureSpot = gameSet.getTreasureSpotByCoordinates(TS.x, TS.y);

		expect(treasureSpot).toEqual(jasmine.objectContaining({
      x: 0,
      y: 1,
      chestsNumber: 1,
    }));
	})
})