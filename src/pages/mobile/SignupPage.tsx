import ProviderLogin from "@components/login/ProviderLogin";
import SignupForm from "@components/login/SignupForm";
import MobilePage from "./MobilePage";
import { Style } from "@capacitor/status-bar";

export default function SignupPage() {
	return (
		<MobilePage backButton iosStatusBarStyle={Style.Light}>
			<div className="flex-grow flex flex-col flex-nowrap justify-center items-stretch">
				<SignupForm />
			</div>
			<ProviderLogin />
		</MobilePage>
	);
}
