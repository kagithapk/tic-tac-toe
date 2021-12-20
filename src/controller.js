class Controller {
	constructor(view, model) {
		this.run = this.run.bind(this);
		this.onFieldClick = this.onFieldClick.bind(this);
		this.clearEventListeners = this.clearEventListeners.bind(this);
		this.reset = this.reset.bind(this);
		this.view = view;
		this.model = model;
	}

	onFieldClick(index) {
		this.view.updateField(index, this.model.player);
		this.model.status[index] = this.model.player;
		this.view.removeEventListner(index);
		const isVictory = this.model.winningPatterns.some((eachPattern) => {
			const x =
				this.model.status[eachPattern[0]] !== '-' &&
				this.model.status[eachPattern[0]] ===
					this.model.status[eachPattern[1]] &&
				this.model.status[eachPattern[1]] ===
					this.model.status[eachPattern[2]] &&
				this.model.status[eachPattern[2]] === this.model.status[eachPattern[0]];
			if (x) {
				this.victoryResult = eachPattern;
			}

			return x;
		});
		const isDraw = !this.model.status.some((eachStatus) => eachStatus === '-');
		if (isVictory) {
			this.view.victory(this.model.player, this.victoryResult);
			this.clearEventListeners();
		} else if (isDraw) {
			this.view.draw();
			this.clearEventListeners();
		}
		this.model.changePlayer();
	}

	clearEventListeners() {
		for (let i = 0; i < 9; i += 1) {
			this.view.removeEventListner(i);
		}
	}

	reset() {
		this.model.clear();
	}

	run() {
		this.view.render(this.onFieldClick, this.reset);
	}
}
