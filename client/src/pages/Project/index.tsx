import moment from "moment";
import React, { Ref, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
const $ = require("jquery");
$.DataTable = require("datatables.net-bs5");

const columns = [
	{ title: "Award Date", data: "awardDate" },
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
	const renderProjectAwardData = () => {
		if (!data?.project) return;
		const { project } = data;
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
		if (tableRef.current) {
			renderProjectAwardData();
		}
	});
	if (loading) return <p>Loading...</p>;
	if (error || !data?.project) return <p>Error loading content</p>;
	const { project } = data;
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
			<h3>Awards</h3>
			<Table width="100%" ref={tableRef} id="project-awards-table"></Table>
		</div>
	);
}

export default Project;
