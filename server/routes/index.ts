import { Express, Request, Response } from "express";
import { projectsData } from "../data";
import { Project } from "../utils/types";

const configRoutes = (app: Express) => {
	app.get("/", async (req: Request, res: Response) => {
		const projects: Project[] = await projectsData.getAllProjects();
		res.json({ projects });
	});
};

export default configRoutes;
