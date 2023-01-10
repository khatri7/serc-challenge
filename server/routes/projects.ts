import express, { Request, Response, Router } from "express";
import { projectsData } from "../data";

const router: Router = express.Router();

router
	.route("/")
	.post(async (req: Request, res: Response) => {
		try {
			const project = await projectsData.addNewRecord(req.body);
			res.status(201).json({ project });
		} catch (e: { message: string } | any) {
			console.error(e.message);
			res.status(500).json({ message: e.message });
		}
	})
	.get(async (req: Request, res: Response) => {
		try {
			const projects = await projectsData.getAllProjects();
			res.json({ projects });
		} catch (e: { message: string } | any) {
			console.error(e.message);
			res.status(500).json({ message: e.message });
		}
	});

router
	.route("/:contract/:rt")
	.get(async (req: Request, res: Response) => {
		try {
			const { contract, rt } = req.params;
			const project = await projectsData.getRecord(contract, parseInt(rt, 10));
			res.json({ project });
		} catch (e: { message: string } | any) {
			console.error(e.message);
			res.status(500).json({ message: e.message });
		}
	})
	.post(async (req: Request, res: Response) => {
		try {
			const { contract, rt } = req.params;
			const project = await projectsData.addIncrementRecord(
				contract,
				parseInt(rt, 10),
				req.body
			);
			res.status(201).json({ project });
		} catch (e: { message: string } | any) {
			console.error(e.message);
			res.status(500).json({ message: e.message });
		}
	});

export default router;
