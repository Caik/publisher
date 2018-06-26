import * as bodyParser from "body-parser";
import * as express from "express";
import { Express, Request, Response } from "express";
import * as graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";
import * as helmet from "helmet";
import { compileSchema } from "typegql";

import { RootSchema } from "../graphql/RootSchema";

export class App {
	public expressApp: Express;

	private schema: GraphQLSchema;

	constructor() {
		this.expressApp = express();
		this.schema = compileSchema({ roots: [RootSchema] });
		this.setBaseMiddlewares();
		this.loadGraphQL();
		this.configDatabase();
		this.setDefaultNotFoundRoute();
	}

	private setBaseMiddlewares(): void {
		this.expressApp.use(helmet());
		this.expressApp.use(bodyParser.json());
	}

	private loadGraphQL(): void {
		this.expressApp.use(
			"/graphql",
			graphqlHTTP({
				schema: this.schema,
				graphiql: true
			})
		);
	}

	private configDatabase(): void {
		// require("../config/Database");
	}

	private setDefaultNotFoundRoute(): void {
		this.expressApp.use((req: Request, res: Response) => {
			res.status(404).json({
				statusCode: 404,
				error: "Not Found",
				message: "URL not found"
			});
		});
	}
}

const app = new App();

export default app;
