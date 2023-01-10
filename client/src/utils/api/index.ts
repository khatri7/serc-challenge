import Axios, { AxiosError } from "axios";

const axios = Axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

export const handleError = (error: AxiosError | any) => {
	if (error.response?.data?.message) return error.response.data.message;
	if (error.message) return error.message;
	return error;
};

/**
 *
 * @param {string} endpoint to which the API request is to be made
 * @param {object} params query parameters
 * @returns response data or error response
 */
export const GET = async (endpoint: string, params = {}, headers = {}) => {
	const { data } = await axios.get(endpoint, { params, headers });
	return data;
};

/**
 *
 * @param {string} endpoint to which the API request is to be made
 * @param {object} body request body
 * @param {object} params query parameters
 * @returns
 */
export const POST = async (
	endpoint: string,
	body = {},
	params = {},
	headers = {}
) => {
	const { data } = await axios.post(endpoint, body, {
		params,
		headers,
	});
	return data;
};

export const getProjects = async () => GET("/projects");

export const addIncrementRecord = async (
	contract: string,
	rt: number,
	award = {}
) => POST(`/projects/${contract}/${rt}`, award);

export const createRecord = async (project: { [key: string]: any }) =>
	POST("/projects", project);
