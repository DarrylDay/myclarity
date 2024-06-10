import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Debug() {
	const history = useHistory();
	const url = "/profile";

	// useEffect(() => {
	// 	console.log(history);
	// 	if (history && history.location.pathname != url) {
	// 		history.push(url);
	// 	}
	// }, [history]);

	return <div></div>;
}
