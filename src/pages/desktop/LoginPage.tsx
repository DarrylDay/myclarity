import { useAuthContext } from "@backend/Auth";
import EmailAndPasswordLogin from "@components/login/EmailAndPasswordLogin";
import ProviderLogin from "@components/login/ProviderLogin";
import { Redirect } from "react-router";
import BoxPage from "./BoxPage";

export default function LoginPage() {
	const authContext = useAuthContext();
	return (
		<BoxPage>
			<EmailAndPasswordLogin />

			<ProviderLogin />
		</BoxPage>
	);
}
