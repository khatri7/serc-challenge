import express, { Express } from "express";
import configRoutes from "./routes";

const app: Express = express();
app.use(express.json());

configRoutes(app);

app.listen(3005, () => {
	console.log("Server started on port 3005!");
});
