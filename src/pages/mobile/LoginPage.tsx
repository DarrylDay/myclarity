import EmailAndPasswordLogin from "@components/login/EmailAndPasswordLogin";
import ProviderLogin from "@components/login/ProviderLogin";
import Logo from "@components/Logo";
import { IonContent, IonPage } from "@ionic/react";
import MobilePage from "./MobilePage";
import { Style } from "@capacitor/status-bar";

export default function LoginPage() {
	return (
		<MobilePage iosStatusBarStyle={Style.Light}>
			<div className="flex-grow mb-4">
				<Logo />
			</div>

			<div className="flex-grow mb-6">
				<EmailAndPasswordLogin />
			</div>
			<ProviderLogin />
		</MobilePage>
	);
}
