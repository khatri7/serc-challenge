import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import { getProjects } from "../utils/api";
const $ = require("jquery");
$.DataTable = require("datatables.net-bs5");

const columns = [
	{ title: "Contract", data: "contract", width: 200 },
	{ title: "Core", data: "core" },
	{ title: "Sponsor", data: "sponsor" },
	{ title: "Task Order", data: "taskOrder" },
	{ title: "RT", data: "rt" },
	{ title: "Kuali", data: "kuali" },
	{ title: "Title", data: "title", width: 200 },
	{ title: "PI", data: "pi", width: 200 },
	{
		title: "Start Date",
		data: "start",
		type: "date",
		dateFormat: "mm-dd-yyyy",
	},
	{ title: "End Date", data: "end", type: "date", dateFormat: "mm-dd-yyyy" },
	{ title: "Calendar Year", data: "year" },
	{ title: "Quarter", data: "quarter" },
];

function Home() {
	const { loading, data, error } = useQuery<{
		projects: Array<{ [key: string]: any }>;
	}>("/projects");
	const tableRef = useRef<HTMLTableElement>(null);
	const [projects, setProjects] = useState(data?.projects ?? []);
	const navigate = useNavigate();

	const renderProjectsData = async () => {
		const data =
			projects?.map((project: { [key: string]: string | number }) => {
				return {
					...project,
					start: moment(project.start).format("MM/DD/YYYY"),
					end: moment(project.end).format("MM/DD/YYYY"),
					year: moment(project.start).format("YYYY"),
					quarter: `Q${moment(project.start).quarter()}`,
				};
			}) ?? [];
		const table = $(`#projects-table`).DataTable({
			data,
			columns,
			destroy: true,
			searching: true,
			scrollX: true,
		});
		$("#projects-table tbody").on("click", "tr", function (this: any) {
			const rowData = table.row(this).data();
			if (rowData && rowData.contract && rowData.rt)
				navigate(`/projects/${rowData.contract}/${rowData.rt}`);
		});
	};

	useEffect(() => {
		setProjects(data?.projects ?? []);
	}, [data?.projects]);

	useEffect(() => {
		if (tableRef.current) renderProjectsData();
	}, [tableRef.current, projects]);

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error loading content: {error}</p>;

	if (projects.length === 0) return <p>No data</p>;

	return (
		<div>
			<Table width="100%" ref={tableRef} id="projects-table"></Table>
		</div>
	);
}

export default Home;
