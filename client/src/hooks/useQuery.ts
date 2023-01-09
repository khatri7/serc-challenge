import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET, handleError } from "../utils/api";

/**
 * Use this hook only to Fetch data using simple GET requests
 * @param {string} endpoint to which the API requst is to be made
 */
function useQuery<T>(endpoint: string) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<boolean | string>(false);
	const [data, setData] = useState<null | T>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const makeReq = async () => {
			try {
				const res = await GET(endpoint);
				setData(res);
				setLoading(false);
				setError(false);
			} catch (e: AxiosError | any) {
				setData(null);
				setLoading(false);
				if (typeof handleError(e) === "string") setError(handleError(e));
				else setError("Unkown error occured");
				if (e.response?.status === 404)
					navigate("/404", {
						state: { message: handleError(e) },
					});
			}
		};
		makeReq();
	}, [endpoint]);

	return {
		loading,
		error,
		data,
	};
}

export default useQuery;
