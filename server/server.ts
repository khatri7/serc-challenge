import express, { Express } from "express";
import configRoutes from "./routes";

const app: Express = express();
app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
	next();
});

configRoutes(app);

app.listen(3005, () => {
	console.log("Server started on port 3005!");
});
