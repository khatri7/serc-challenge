import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import Project from "./pages/Project";
import CreateRecord from "./pages/CreateRecord";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<div className="container pt-4">
					<Routes>
						<Route index element={<Home />} />
						<Route path="/projects/:contract/:rt" element={<Project />} />
						<Route path="/create" element={<CreateRecord />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
