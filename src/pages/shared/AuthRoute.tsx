import { Redirect, Route } from "react-router";
import { useAuthContext } from "@backend/Auth";
import LoadingOverlay from "@components/LoadingOverlay";
import ErrorPage from "./ErrorPage";

type Props = {
	children: any;
	path?: string;
	exact?: boolean;
};

export default function AuthRoute(props: Props) {
	const authContext = useAuthContext();

	return (
		<Route path={props.path} exact={props.exact}>
			{authContext.error ? (
				<ErrorPage message="Auth/Profile Data" />
			) : authContext.loading ? (
				<LoadingOverlay />
			) : authContext.user ? (
				<>{props.children}</>
			) : (
				<>
					<Redirect to="/login" />
				</>
			)}
		</Route>
	);
}
