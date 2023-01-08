import { Decimal } from "@prisma/client/runtime";

export interface Project {
	id: number;
	contract: string;
	core: string;
	sponsor: string;
	thrust?: string | null;
	taskOrder: number;
	rt: number;
	kuali: number;
	title: string;
	pi: string;
	start: Date;
	end: Date;
	awardDate?: Date | null;
	totalAwardAmount: number | Decimal;
	increment: number;
	incrementAmount: number | Decimal;
	taskCorrelation?: string | null;
}

export interface Award {
	awardDate: Date | null;
	totalAwardAmount: number | Decimal;
	increment: number;
	incrementAmount: number | Decimal;
}
