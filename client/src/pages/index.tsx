import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../utils/api";
const $ = require("jquery");
$.DataTable = require("datatables.net-bs5");

const columns = [
	{ title: "Contract", data: "contract" },
	{ title: "Core", data: "core" },
	{ title: "Sponsor", data: "sponsor" },
	{ title: "Task Order", data: "taskOrder" },
	{ title: "RT", data: "rt" },
	{ title: "Kuali", data: "kuali" },
	{ title: "Title", data: "title" },
	{ title: "PI", data: "pi" },
	{ title: "Start Date", data: "start" },
	{ title: "End Date", data: "end" },
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
			<div
				style={{
					textAlign: "right",
				}}
			>
				<Button>Create Record</Button>
			</div>
			<Table width="100%" id="projects-table"></Table>
		</div>
	);
}

export default Home;
