import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div className="container pt-4">
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
