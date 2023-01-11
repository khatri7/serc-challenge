import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
	Stack,
} from "react-bootstrap";
import { addIncrementRecord, handleError } from "../../utils/api";

const validationSchema = Yup.object().shape({
	awardDate: Yup.date().required("Award Date is required"),
	totalAwardAmount: Yup.number().required(
		"Total Award Amount is a required field"
	),
	incrementAmount: Yup.number().required(
		"Increment Amount is a required field"
	),
});

export const FormInput: React.FC<{
	label: string;
	handleChange: React.ChangeEventHandler;
	name: string;
	type: string;
	err: string | undefined;
}> = ({ label, handleChange, name, type, err }) => (
	<Form.Group className="mb-3">
		<Form.Label>{label}</Form.Label>
		<Form.Control
			name={name}
			type={type}
			onChange={handleChange}
			className={err ? "is-invalid" : ""}
			step="any"
		/>
		{err && <div className="invalid-feedback">{err}</div>}
	</Form.Group>
);

const AddIncrementForm = ({
	close,
	onSuccess,
	contract,
	rt,
}: {
	close: React.MouseEventHandler<HTMLButtonElement>;
	onSuccess: Function;
	contract: string;
	rt: number;
}) => {
	return (
		<div
			style={{
				margin: "1rem 0",
			}}
		>
			<Card>
				<Card.Body>
					<Formik<{
						awardDate: Date | "";
						totalAwardAmount: number | "";
						incrementAmount: number | "";
					}>
						initialValues={{
							awardDate: "",
							totalAwardAmount: "",
							incrementAmount: "",
						}}
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							try {
								const resp = await addIncrementRecord(contract, rt, values);
								if (!resp.project) throw new Error();
								onSuccess(resp.project);
							} catch (e) {
								let error = "Unexpected error occurred";
								if (typeof handleError(e) === "string") error = handleError(e);
								window.alert(error);
							}
						}}
					>
						{({ errors, handleSubmit, handleChange }) => {
							return (
								<Form onSubmit={handleSubmit}>
									<Container>
										<Row>
											<Col>
												<FormInput
													label="Award Date"
													name="awardDate"
													err={errors.awardDate}
													handleChange={handleChange}
													type="date"
												/>
											</Col>
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
										</Row>
										<Stack
											direction="horizontal"
											gap={2}
											style={{
												justifyContent: "flex-end",
											}}
										>
											<Button variant="secondary" onClick={close}>
												Cancel
											</Button>
											<Button type="submit">Save</Button>
										</Stack>
									</Container>
								</Form>
							);
						}}
					</Formik>
				</Card.Body>
			</Card>
		</div>
	);
};

export default AddIncrementForm;
