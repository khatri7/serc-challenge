import { db } from "../utils/db.server";
import { Award, Project } from "../utils/types";

export const doesRecordExist = async (
	contract: Project["contract"],
	rt: Project["rt"]
): Promise<Boolean> => {
	const record = await db.project.findFirst({
		where: {
			contract,
			rt,
		},
	});
	if (record) return true;
	return false;
};

export const getAllProjects = async (): Promise<
	Omit<
		Project,
		| "increment"
		| "thrust"
		| "awardDate"
		| "totalAwardAmount"
		| "increment"
		| "incrementAmount"
		| "taskCorrelation"
	>[]
> => {
	const projects = await db.project.findMany({
		distinct: ["contract", "rt"],
		select: {
			id: true,
			contract: true,
			core: true,
			sponsor: true,
			taskOrder: true,
			rt: true,
			kuali: true,
			title: true,
			pi: true,
			start: true,
			end: true,
		},
	});
	return projects;
};

export const addNewRecord = async (project: Project): Promise<Project> => {
	const {
		contract,
		core,
		sponsor,
		taskOrder,
		rt,
		kuali,
		title,
		pi,
		start,
		end,
		totalAwardAmount,
		incrementAmount,
	} = project;
	if (
		!contract ||
		!core ||
		!sponsor ||
		!taskOrder ||
		!rt ||
		!kuali ||
		!title ||
		!pi ||
		!start ||
		!end ||
		!totalAwardAmount ||
		!incrementAmount
	)
		throw new Error("Please provide all required fields");
	const existingRecord = await doesRecordExist(project.contract, project.rt);
	if (existingRecord)
		throw new Error("Project with this Contract and RT combination exists");
	const newRecord = await db.project.create({
		data: {
			contract,
			core,
			sponsor,
			taskOrder,
			rt,
			kuali,
			title,
			pi,
			totalAwardAmount,
			incrementAmount,
			start: new Date(start),
			end: new Date(end),
		},
	});
	return newRecord;
};

export const getRecord = async (
	contract: Project["contract"],
	rt: Project["rt"]
): Promise<
	Omit<
		Project,
		"awardDate" | "totalAwardAmount" | "increment" | "incrementAmount"
	> & {
		awards: Award[];
	}
> => {
	const projects = await db.project.findMany({
		where: {
			contract,
			rt,
		},
	});
	if (projects.length === 0)
		throw new Error("No project found with given Contract and RT");
	const {
		id,
		core,
		sponsor,
		thrust,
		taskOrder,
		kuali,
		title,
		pi,
		start,
		end,
		taskCorrelation,
	} = projects[0];
	const awards = projects.map(
		({ awardDate, totalAwardAmount, increment, incrementAmount }) => ({
			awardDate,
			totalAwardAmount,
			increment,
			incrementAmount,
		})
	);
	const project = {
		id,
		contract,
		core,
		sponsor,
		thrust,
		taskOrder,
		rt,
		kuali,
		title,
		pi,
		start,
		end,
		taskCorrelation,
		awards,
	};
	return project;
};

export const addIncrementRecord = async (
	contract: Project["contract"],
	rt: Project["rt"],
	award: Omit<Award, "increment">
) => {
	const existingRecords = await db.project.findMany({
		where: {
			contract,
			rt,
		},
		orderBy: {
			increment: "desc",
		},
	});
	if (!award.totalAwardAmount)
		throw new Error("Valid total award amount is required");
	if (!award.incrementAmount)
		throw new Error("Valid increment amount is required");
	if (!award.awardDate) throw new Error("Valid award date is required");
	if (existingRecords.length === 0)
		throw new Error("No project found with given Contract and RT");
	const increment = existingRecords[0].increment + 1;
	const { id, ...existingRecord } = existingRecords[0];
	const newRecordObj = {
		...existingRecord,
		awardDate: new Date(award.awardDate),
		totalAwardAmount: award.totalAwardAmount,
		incrementAmount: award.incrementAmount,
		increment,
	};
	await db.project.create({
		data: newRecordObj,
	});
	const newRecord = await getRecord(contract, rt);
	return newRecord;
};
