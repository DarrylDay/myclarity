import { IonContent, IonFooter, isPlatform } from "@ionic/react";

import WelcomeSlides from "@components/help/WelcomeSlides";
import { StatusBar, Style } from "@capacitor/status-bar";

export default function WelcomePage() {
	if (isPlatform("ios") && isPlatform("capacitor")) {
		StatusBar.setStyle({
			style: Style.Light,
		});
	}

	return (
		<>
			<IonContent forceOverscroll={false}>
				<WelcomeSlides onFinished={"/tasks"} />
			</IonContent>
			<IonFooter className="max-h-8 h-full"></IonFooter>
		</>
	);
}
