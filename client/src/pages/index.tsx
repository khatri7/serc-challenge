import moment from "moment";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../utils/api";
const $ = require("jquery");
$.DataTable = require("datatables.net-bs5");

const columns = [
	{ title: "Contract", data: "contract", width: 250 },
	{ title: "Core", data: "core", width: 100 },
	{ title: "Sponsor", data: "sponsor", width: 100 },
	{ title: "Task Order", data: "taskOrder", width: 100 },
	{ title: "RT", data: "rt", width: 100 },
	{ title: "Kuali", data: "kuali", width: 100 },
	{ title: "Title", data: "title", width: 200 },
	{ title: "PI", data: "pi", width: 200 },
	{ title: "Start Date", data: "start", width: 100 },
	{ title: "End Date", data: "end", width: 100 },
	{ title: "Calendar Year", data: "year", width: 100 },
	{ title: "Quarter", data: "quarter", width: 100 },
];

function Home() {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const renderProjectsData = async () => {
		const projectsData = await getProjects();
		setLoading(false);
		const data =
			projectsData.projects?.map(
				(project: { [key: string]: string | number | null }) => ({
					...project,
					start: moment(project.start).format("MM/DD/YYYY"),
					end: moment(project.end).format("MM/DD/YYYY"),
					year: moment(project.start).format("YYYY"),
					quarter: `Q${moment(project.start).quarter()}`,
				})
			) ?? [];
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
		renderProjectsData();
	}, []);
	return (
		<div>
			{loading && <p>Loading...</p>}
			<Table width="100%" id="projects-table"></Table>
		</div>
	);
}

export default Home;
