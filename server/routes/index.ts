import { Express, Request, Response } from "express";
import projectsRoutes from "./projects";
import { projectsData } from "../data";
import { Project } from "../utils/types";

const configRoutes = (app: Express) => {
	app.use("/projects", projectsRoutes);
};

export default configRoutes;
