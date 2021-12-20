class Model {
	constructor() {
		this.winningPatterns = [
			[0, 1, 2],
			[0, 3, 6],
			[0, 4, 8],
			[1, 4, 7],
			[2, 5, 8],
			[2, 4, 6],
			[3, 4, 5],
			[6, 7, 8],
		];
		this.status = new Array(9).fill('-');
		this.player = 'X';
	}

	changePlayer() {
		this.player = this.player === 'X' ? 'O' : 'X';
	}

	clear() {
		this.player = 'X';
		this.status.fill('-');
	}
}
