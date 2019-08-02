describe('Testing class "Coordinates"', () => {
	it('should throw an error trying to instantiate (no params)', () => {
		function createCoordinates() {
			new Coordinates();
		}
		expect(createCoordinates).toThrow(new TypeError('Abstract class "Coordinates" cannot be directly instanciated.'));
	})
	
	it('should throw an error trying to instantiate (correct params)', () => {
		function createCoordinates(x, y) {
			new Coordinates(x, y);
		}
		expect(createCoordinates).toThrow(new TypeError('Abstract class "Coordinates" cannot be directly instanciated.'));
	})
})
