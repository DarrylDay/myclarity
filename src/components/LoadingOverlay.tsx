import { useAuthContext } from "@backend/Auth";
import { IonContent, IonBackdrop, IonSpinner } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";

import "./LoadingOverlay.css";
import { useEffect } from "react";
import { isPlatform } from "@ionic/core";

export default function LoadingOverlay() {
	useEffect(() => {
		if (isPlatform("ios") && isPlatform("capacitor")) {
			StatusBar.setStyle({
				style: Style.Light,
			});
		}
	});

	return (
		<IonContent>
			<IonSpinner className={"loading-overlay"} />
			{/* <IonBackdrop className={"loading-overlay"} /> */}
		</IonContent>
	);
}
