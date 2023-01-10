import { Formik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createRecord, handleError } from "../../utils/api";

interface FormValues {
	contract: string;
	core: string;
	sponsor: string;
	taskOrder: number | "";
	rt: number | "";
	kuali: number | "";
	title: string;
	pi: string;
	start: Date | "";
	end: Date | "";
	totalAwardAmount: number | "";
	incrementAmount: number | "";
}

function CreateRecord() {
	const navigate = useNavigate();
	return (
		<div>
			<h1 className="mb-3">New Entry</h1>
			<Formik<FormValues>
				initialValues={{
					contract: "",
					core: "",
					sponsor: "",
					taskOrder: "",
					rt: "",
					kuali: "",
					title: "",
					pi: "",
					start: "",
					end: "",
					totalAwardAmount: "",
					incrementAmount: "",
				}}
				onSubmit={async (values) => {
					try {
						const resp = await createRecord(values);
						if (!resp.project) throw new Error();
						navigate("/");
					} catch (e) {
						let error = "Unexpected error occurred";
						if (typeof handleError(e) === "string") error = handleError(e);
						window.alert(error);
					}
				}}
			>
				{({ handleSubmit, handleChange }) => (
					<Form onSubmit={handleSubmit}>
						<Container>
							<Row>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Contract</Form.Label>
										<Form.Control
											name="contract"
											type="text"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Core</Form.Label>
										<Form.Control
											name="core"
											type="text"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Sponsor</Form.Label>
										<Form.Control
											name="sponsor"
											type="text"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Title</Form.Label>
										<Form.Control
											name="title"
											type="text"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Task Order</Form.Label>
										<Form.Control
											name="taskOrder"
											type="number"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>RT</Form.Label>
										<Form.Control
											name="rt"
											type="number"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Kuali</Form.Label>
										<Form.Control
											name="kuali"
											type="number"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>PI</Form.Label>
										<Form.Control
											name="pi"
											type="text"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Start Date</Form.Label>
										<Form.Control
											name="start"
											type="date"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>End Date</Form.Label>
										<Form.Control
											name="end"
											type="date"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Total Award Amount</Form.Label>
										<Form.Control
											name="totalAwardAmount"
											type="number"
											step="any"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>Increment Amount</Form.Label>
										<Form.Control
											name="incrementAmount"
											type="number"
											step="any"
											onChange={handleChange}
										/>
									</Form.Group>
								</Col>
								<Col />
							</Row>
						</Container>
						<div
							style={{
								textAlign: "right",
							}}
						>
							<Button size="lg" type="submit">
								Submit
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default CreateRecord;
