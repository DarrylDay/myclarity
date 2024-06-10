import { useIonToast } from "@ionic/react";
import { createContext, useContext } from "react";

type NotificationType = "Info" | "Success" | "Error";

const notificationContext = createContext<
	[
		(type: NotificationType, message: string, duration?: number) => void,
		() => void
	]
>([(options) => {}, () => {}]);

export function useNotifictions() {
	return useContext(notificationContext);
}

export function ProvideNotification({ children }: any) {
	const [presentToast, dismiss] = useIonToast();

	const createNotification = (
		type: NotificationType,
		message: string,
		duration: number = 2000
	) => {
		presentToast({
			message: message,
			duration: duration,
			position: "top",
			cssClass:
				"toast-base " +
				(type == "Info"
					? "toast-info"
					: type == "Success"
					? "toast-info"
					: type == "Error"
					? "toast-error"
					: ""),
		});
	};

	return (
		<notificationContext.Provider value={[createNotification, dismiss]}>
			{children}
		</notificationContext.Provider>
	);
}
