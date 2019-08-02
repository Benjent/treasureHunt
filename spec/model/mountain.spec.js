describe('Testing class "Mountain"', () => {
	it('should throw an error trying to instantiate (no params)', () => {
		function createMountain() {
			new Mountain();
		}
		expect(createMountain).toThrow(new TypeError('Abstract class "Coordinates" cannot be instanciated with nil properties.'));
	})
	
	it('should throw an error trying to instantiate (correct params)', () => {
		function createMountain() {
			new Mountain(-1, 8);
		}
		expect(createMountain).toThrow(new TypeError('Abstract class "Coordinates" coordinates must be positive.'));
	})
})
