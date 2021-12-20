class App {
	constructor() {
		this.model = new Model();
		this.view = new View();
	}
	init() {
		this.controller = new Controller(this.view, this.model);
		this.controller.run();
	}
}

const app = new App();
app.init();
