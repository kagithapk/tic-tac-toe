class View {
	constructor() {
		this.board = this.board.bind(this);
		this.startButton = this.startButton.bind(this);
		this.resetButton = this.resetButton.bind(this);
		this.render = this.render.bind(this);
		this.addEventListener = this.addEventListener.bind(this);
		this.updateField = this.updateField.bind(this);
		this.victory = this.victory.bind(this);
		this.listeners = {};
	}

	board() {
		this.boardContainer = document.createElement('section');
		this.boardContainer.setAttribute('class', 'board');
		this.boardContainer.setAttribute('id', 'board');
		let temp;
		for (let i = 0; i < 9; i += 1) {
			if (i % 3 === 0) {
				temp = document.createElement('div');
				temp.setAttribute('class', 'row-container');
			}
			const field = document.createElement('div');
			field.setAttribute('id', `field-${i}`);
			field.setAttribute('class', 'field');
			temp.append(field);
			if (i % 3 === 2) {
				this.boardContainer.append(temp);
			}
		}
	}

	addEventListener(callback) {
		for (let i = 0; i < 9; i += 1) {
			const field = document.getElementById(`field-${i}`);
			field.className = `${field.className} playable`;
			this.listeners[i] = () => callback(i);
			field.addEventListener('click', this.listeners[i]);
		}
	}

	removeEventListner(index) {
		const field = document.getElementById(`field-${index}`);
		field.className = `field`;
		field.removeEventListener('click', this.listeners[index]);
	}

	startButton(eventListner, callback) {
		this.start = document.createElement('button');
		this.start.setAttribute('id', 'start-button');
		this.start.setAttribute('class', 'start-button button');
		this.start.innerText = 'Start';
		this.start.addEventListener('click', () => {
			callback();
			for (let i = 0; i < 9; i += 1) {
				const field = document.getElementById(`field-${i}`);
				field.innerHTML = '';
				field.style = {};
			}
			this.addEventListener(eventListner);
			this.start.style.display = 'none';
			if (this.message) {
				this.message.remove();
			}
			if (this.reset) {
				this.reset.style.display = 'block';
			}
		});
	}

	resetButton(callback) {
		this.reset = document.createElement('button');
		this.reset.setAttribute('id', 'reset-button');
		this.reset.setAttribute('class', 'reset-button button');
		this.reset.innerText = 'Reset';
		this.reset.style.display = 'none';
		this.reset.addEventListener('click', () => {
			callback();
			for (let i = 0; i < 9; i += 1) {
				const field = document.getElementById(`field-${i}`);
				field.innerHTML = '';
				field.style = {};
				this.removeEventListner(i);
				this.reset.style.display = 'none';
				this.start.style.display = 'block';
			}
		});
	}

	updateField(index, player) {
		const field = document.getElementById(`field-${index}`);
		const value = document.createElement('p');
		value.setAttribute('class', 'value');
		value.innerText = player;
		field.appendChild(value);
	}

	createMessage() {
		this.message = document.createElement('section');
		this.message.setAttribute('id', 'message');
	}

	victory(player, result) {
		this.createMessage();
		this.message.className = 'success';
		this.message.innerText = `${player} has won!`;
		const main = document.getElementById('main');
		main.append(this.message);
		result.forEach((eachResult) => {
			const field = document.getElementById(`field-${eachResult}`);
			field.style.backgroundColor = 'green';
			field.style.color = '#fff';
		});
		this.start.style.display = 'block';
		this.reset.style.display = 'none';
		this.start.innerText = 'Start again';
	}

	draw() {
		this.message.className = 'draw';
		this.message.innerText = "It's a draw";
		const main = document.getElementById('main');
		main.append(this.message);
		this.start.style.display = 'block';
		this.reset.style.display = 'none';
		this.start.innerText = 'Start again';
	}

	render(eventListener, callback) {
		const main = document.getElementById('main');
		this.board();
		this.startButton(eventListener, callback);
		this.resetButton(callback);
		main.appendChild(this.boardContainer);
		main.appendChild(this.start);
		main.appendChild(this.reset);
	}
}
