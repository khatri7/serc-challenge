import { Prisma } from "@prisma/client";
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

export default router;
