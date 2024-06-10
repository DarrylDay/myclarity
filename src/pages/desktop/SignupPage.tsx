import ProviderLogin from "@components/login/ProviderLogin";
import SignupForm from "@components/login/SignupForm";
import BoxPage from "./BoxPage";

export default function SignupPage() {
	return (
		<BoxPage>
			<SignupForm />
			<ProviderLogin text={"Or sign up with"} />
		</BoxPage>
	);
}
