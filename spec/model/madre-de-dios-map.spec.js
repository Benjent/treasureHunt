describe('Testing class "MadreDeDiosMap"', () => {
	it('should convert number-like strings to numbers as width and height properties', () => {
		const map = new MadreDeDiosMap(4, '4');
		expect(map).toEqual(jasmine.objectContaining({
      width: 4,
      height: 4,
    }));
	})

	it('should return true if the given coordinates are out of bounds', () => {
		const map = new MadreDeDiosMap(4, '4');
		expect(map.isOutOfBounds(-1, 2)).toBe(true);
		expect(map.isOutOfBounds(1, -2)).toBe(true);
		expect(map.isOutOfBounds(1, 5)).toBe(true);
		expect(map.isOutOfBounds(5, 2)).toBe(true);
		// Inbounds coordinates
		expect(map.isOutOfBounds(2, 2)).toBe(false);
	})
})
