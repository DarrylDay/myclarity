import { Redirect } from "react-router";
import { useAuthContext } from "@backend/Auth";
import LoadingOverlay from "@components/LoadingOverlay";
import ErrorPage from "./ErrorPage";

type Props = {
	children: any;
};

export default function AuthPage(props: Props) {
	const authContext = useAuthContext();

	return authContext.error ? (
		<ErrorPage message="Auth/Profile Data" />
	) : authContext.loading ? (
		<LoadingOverlay />
	) : authContext.user ? (
		<>{props.children}</>
	) : (
		<>
			<Redirect to="/login" />
		</>
	);
}
