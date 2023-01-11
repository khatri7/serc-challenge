import { Formik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormInput } from "../../components/AddIncrementForm";
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

const validationSchema = Yup.object().shape({
	contract: Yup.string().required("Contract is required"),
	core: Yup.string().required("Core is required"),
	sponsor: Yup.string().required("Sponsor is required"),
	taskOrder: Yup.number().required("Task Order is required"),
	rt: Yup.number().required("RT is required"),
	kuali: Yup.number().required("Kuali is required"),
	title: Yup.string().required("Title is required"),
	pi: Yup.string().required("PI is required"),
	start: Yup.date().required("Start date is required"),
	end: Yup.date().required("End date is required"),
	totalAwardAmount: Yup.number().required("Total award amount is required"),
	incrementAmount: Yup.number().required("Increment amount is required"),
});

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
				validationSchema={validationSchema}
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
				{({ handleSubmit, handleChange, errors }) => (
					<Form onSubmit={handleSubmit}>
						<Container>
							<Row>
								<Col>
									<FormInput
										label="Contract"
										name="contract"
										err={errors.contract}
										handleChange={handleChange}
										type="text"
									/>
								</Col>
								<Col>
									<FormInput
										label="Core"
										name="core"
										err={errors.core}
										handleChange={handleChange}
										type="text"
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<FormInput
										label="Sponsor"
										name="sponsor"
										err={errors.sponsor}
										handleChange={handleChange}
										type="text"
									/>
								</Col>
								<Col>
									<FormInput
										label="Title"
										name="title"
										err={errors.title}
										handleChange={handleChange}
										type="text"
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<FormInput
										label="Task Order"
										name="taskOrder"
										err={errors.taskOrder}
										handleChange={handleChange}
										type="number"
									/>
								</Col>
								<Col>
									<FormInput
										label="RT"
										name="rt"
										err={errors.rt}
										handleChange={handleChange}
										type="number"
									/>
								</Col>
								<Col>
									<FormInput
										label="Kuali"
										name="kuali"
										err={errors.kuali}
										handleChange={handleChange}
										type="number"
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<FormInput
										label="PI"
										name="pi"
										err={errors.pi}
										handleChange={handleChange}
										type="text"
									/>
								</Col>
								<Col>
									<FormInput
										label="Start Date"
										name="start"
										err={errors.start}
										handleChange={handleChange}
										type="date"
									/>
								</Col>
								<Col>
									<FormInput
										label="End Date"
										name="end"
										err={errors.end}
										handleChange={handleChange}
										type="date"
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<FormInput
										label="Total Award Amount"
										name="totalAwardAmount"
										err={errors.totalAwardAmount}
										handleChange={handleChange}
										type="number"
									/>
								</Col>
								<Col>
									<FormInput
										label="Increment Amount"
										name="incrementAmount"
										err={errors.incrementAmount}
										handleChange={handleChange}
										type="number"
									/>
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
