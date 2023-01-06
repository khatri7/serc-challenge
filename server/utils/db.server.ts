import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
	var __db: PrismaClient | undefined;
}

// make sure we use the same connection rather than creating new connection to DB everytime we reload server
if (!global.__db) {
	global.__db = new PrismaClient();
}

db = global.__db;

export { db };
