import { loginWithGoolge } from "@backend/Auth";
import { useNotifictions } from "@components/NotificationManager";
import { IonText, isPlatform } from "@ionic/react";

import ProviderButton from "./ProviderButton";

type Props = {
	text?: string;
};

export default function ProviderLogin(props: Props) {
	const [createNotification] = useNotifictions();

	const handleLoginWithGoolge = async () => {
		if (isPlatform("electron")) {
			createNotification(
				"Info",
				"Google login for desktop app coming soon."
			);
			return;
		}

		await loginWithGoolge();
	};

	return (
		<div className="text-center">
			<IonText color="medium">
				<p>- {props.text ? props.text : "Or sign in with"} -</p>
			</IonText>

			<br />

			<div className="flex flex-row flex-nowrap gap-3 justify-center">
				<ProviderButton
					imgSrc="/assets/SSO_Google.png"
					onClick={handleLoginWithGoolge}
					id="SSO_Google"
				/>

				<ProviderButton
					imgSrc="/assets/SSO_Facebook.png"
					onClick={(e) => {
						createNotification(
							"Info",
							"Facebook login coming soon"
						);
					}}
					iconHeight="32px"
					id="SSO_Facebook"
				/>

				<ProviderButton
					imgSrc="/assets/SSO_Twitter.png"
					onClick={(e) => {
						createNotification("Info", "Twitter login coming soon");
					}}
					iconHeight="42px"
					id="SSO_Twitter"
				/>
			</div>
		</div>
	);
}
