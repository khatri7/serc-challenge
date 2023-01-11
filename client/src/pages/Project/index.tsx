import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { Button, Stack, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddIncrementForm from "../../components/AddIncrementForm";
import useQuery from "../../hooks/useQuery";
const $ = require("jquery");
$.DataTable = require("datatables.net-bs5");

const columns = [
	{
		title: "Award Date",
		data: "awardDate",
		type: "date",
		dateFormat: "mm-dd-yyyy",
	},
	{ title: "Total Amount", data: "totalAwardAmount" },
	{ title: "Increment", data: "increment" },
	{ title: "Increment Amount", data: "incrementAmount" },
];

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function Project() {
	const { contract, rt } = useParams();
	const tableRef = useRef<HTMLTableElement>(null);
	const { data, loading, error } = useQuery<{
		project: { [key: string]: any };
	}>(`/projects/${contract}/${rt}`);
	const [project, setProject] = useState(data?.project);
	const [showIncrementForm, setShowIncrementForm] = useState<Boolean>(false);
	useEffect(() => {
		setProject(data?.project);
	}, [data?.project]);

	const renderProjectAwardData = () => {
		if (!project) return;
		const awardData =
			project.awards?.map(
				(award: {
					awardDate: string | null;
					totalAwardAmount: number;
					incrementAmount: number;
					increment: number;
				}) => ({
					awardDate: award.awardDate
						? moment(award.awardDate).format("MM/DD/YYYY")
						: "",
					totalAwardAmount: formatter.format(award.totalAwardAmount),
					incrementAmount: formatter.format(award.incrementAmount),
					increment: `#${award.increment}`,
				})
			) ?? [];
		$(`#project-awards-table`).DataTable({
			data: awardData,
			columns,
			destroy: true,
			scrollX: true,
			order: [[2, "asc"]],
		});
	};

	useEffect(() => {
		if (tableRef.current) renderProjectAwardData();
	}, [tableRef.current, project?.awards]);

	if (loading) return <p>Loading...</p>;

	if (error || !project) return <p>Error loading content: {error}</p>;

	return (
		<div>
			<h1>{project.title}</h1>
			<dl className="row">
				<dt className="col-sm-3">Contract</dt>
				<dd className="col-sm-9">{project.contract}</dd>
				<dt className="col-sm-3">Core</dt>
				<dd className="col-sm-9">{project.core}</dd>
				<dt className="col-sm-3">Thrust</dt>
				<dd className="col-sm-9">{project.thrust}</dd>
				<dt className="col-sm-3">Task Order</dt>
				<dd className="col-sm-9">{project.taskOrder}</dd>
				<dt className="col-sm-3">RT</dt>
				<dd className="col-sm-9">{project.rt}</dd>
				<dt className="col-sm-3">Kuali</dt>
				<dd className="col-sm-9">{project.kuali}</dd>
				<dt className="col-sm-3">PI</dt>
				<dd className="col-sm-9">{project.pi}</dd>
				<dt className="col-sm-3">Start Date</dt>
				<dd className="col-sm-9">
					{moment(project.start).format("MM/DD/YYYY")}
				</dd>
				<dt className="col-sm-3">End Date</dt>
				<dd className="col-sm-9">{moment(project.end).format("MM/DD/YYYY")}</dd>
				<dt className="col-sm-3">Task Correlation</dt>
				<dd className="col-sm-9">{project.taskCorrelation}</dd>
			</dl>
			<Stack
				direction="horizontal"
				style={{
					justifyContent: "space-between",
					marginBottom: "1rem",
				}}
			>
				<h3>Awards</h3>
				{!showIncrementForm && (
					<Button
						onClick={() => {
							setShowIncrementForm(true);
						}}
					>
						Add Increment
					</Button>
				)}
			</Stack>
			<div>
				{showIncrementForm && (
					<AddIncrementForm
						close={() => {
							setShowIncrementForm(false);
						}}
						onSuccess={(project: { [key: string]: any }) => {
							setProject(project);
							setShowIncrementForm(false);
						}}
						contract={project.contract}
						rt={project.rt}
					/>
				)}
			</div>
			<Table width="100%" ref={tableRef} id="project-awards-table"></Table>
		</div>
	);
}

export default Project;
