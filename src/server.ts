import { App } from "./app/base/App";
import appInstance from "./app/base/App";

class Server {
	constructor(app: App) {
		const port = (process.env.API_CONTAINER_PORT || 9000);

		app.expressApp.listen(port, () =>
			console.log(`Server listening on port ${port}`)
		);
	}
}

const server = new Server(appInstance);
