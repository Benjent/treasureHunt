class Map {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	isOutOfBounds(x, y) {
		return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
	}
}