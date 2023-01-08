import { db } from "../utils/db.server";
import { Project } from "../utils/types";

export const getRecord = async (
	contract: Project["contract"],
	rt: Project["rt"]
): Promise<Project | null> => {
	const record = await db.project.findFirst({
		where: {
			contract,
			rt,
		},
	});
	return record;
};

export const getAllProjects = async (): Promise<Project[]> => {
	const projects = await db.project.findMany();
	return projects;
};

export const addNewRecord = async (project: Project): Promise<Project> => {
	const existingRecord = await getRecord(project.contract, project.rt);
	if (existingRecord)
		throw new Error("Project with this Contract and RT combination exists");
	const newRecord = await db.project.create({
		data: {
			...project,
			start: new Date(project.start),
			end: new Date(project.end),
		},
	});
	return newRecord;
};
