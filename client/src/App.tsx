import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import Project from "./pages/Project";

function App() {
	return (
		<div className="container pt-4">
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/projects/:contract/:rt" element={<Project />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
