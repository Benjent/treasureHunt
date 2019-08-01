describe('Testing class "TreasureSpot"', () => {
	it('should convert number-like strings to numbers for chestsNumber property', () => {
		const map = new TreasureSpot(4, 4, '2');
		expect(map).toEqual(jasmine.objectContaining({
      chestsNumber: 2,
    }));
	})
})
