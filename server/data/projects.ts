import { db } from "../utils/db.server";
import { Project } from "../utils/types";

export const getAllProjects = async (): Promise<Project[]> => {
	const projects = await db.project.findMany();
	return projects;
};
