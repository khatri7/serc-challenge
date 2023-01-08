import { Express, Request, Response } from "express";
import projectsRoutes from "./projects";
import { projectsData } from "../data";
import { Project } from "../utils/types";

const configRoutes = (app: Express) => {
	app.get("/", async (req: Request, res: Response) => {
		const projects: Project[] = await projectsData.getAllProjects();
		res.json({ projects });
	});

	app.use("/projects", projectsRoutes);
};

export default configRoutes;
