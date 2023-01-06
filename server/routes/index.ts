import { Express, Request, Response } from "express";

const configRoutes = (app: Express) => {
	app.get("/", (req: Request, res: Response) => {
		res.json({
			message: "Hello",
		});
	});
};

export default configRoutes;
