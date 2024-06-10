import ForgotpasswordForm from "@components/login/ForgotPasswordForm";
import MobilePage from "./MobilePage";
import { Style } from "@capacitor/status-bar";

export default function ForgotPasswordPage() {
	return (
		<MobilePage backButton iosStatusBarStyle={Style.Light}>
			<ForgotpasswordForm />
		</MobilePage>
	);
}
