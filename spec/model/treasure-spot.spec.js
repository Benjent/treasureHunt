describe('Testing class "TreasureSpot"', () => {
	it('should throw an error trying to instantiate (nil params)', () => {
		function c1() {
			new TreasureSpot('', 1, 0);
		}
		function c2() {
			new TreasureSpot(1, null, 0);
		}
		function c3() {
			new TreasureSpot(1, 1, undefined);
		}
		
		expect(c1).toThrow(new TypeError('Abstract class "Coordinates" cannot be instanciated with nil properties.'));
		expect(c2).toThrow(new TypeError('Abstract class "Coordinates" cannot be instanciated with nil properties.'));
		expect(c3).toThrow(new TypeError('Class "TreasureSpot" cannot be instanciated with nil properties.'));
	})

	it('should throw an error trying to instantiate (wrong coordinates)', () => {
		function createTreasureSpot() {
			new TreasureSpot(-1, '-1', 0);
		}
		expect(createTreasureSpot).toThrow(new TypeError('Abstract class "Coordinates" coordinates must be positive.'));
	})

	it('should throw an error trying to instantiate (wrong chestsNumber)', () => {
		function createTreasureSpot() {
			new TreasureSpot(1, 1, -2);
		}
		expect(createTreasureSpot).toThrow(new TypeError('Class "TreasureSpot" chests number must be positive.'));
	})

	it('should convert number-like strings to numbers for chestsNumber property', () => {
		const map = new TreasureSpot(4, 4, '2');
		expect(map).toEqual(jasmine.objectContaining({
      chestsNumber: 2,
    }));
	})
})
