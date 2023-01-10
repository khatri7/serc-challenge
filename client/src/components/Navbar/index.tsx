import React from "react";
import { Button, Container, Navbar as BNavbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	return (
		<BNavbar bg="light">
			<Container>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Button
						onClick={() => {
							navigate("/");
						}}
						variant="light"
					>
						HOME
					</Button>
					<Button
						onClick={() => {
							navigate("/create");
						}}
					>
						Create Record
					</Button>
				</div>
			</Container>
		</BNavbar>
	);
}

export default Navbar;
