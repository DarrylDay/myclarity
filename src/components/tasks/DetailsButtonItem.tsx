import { IonIcon, IonItem, IonLabel, isPlatform } from "@ionic/react";
import { isMobile } from "react-device-detect";

type Props = {
	icon: string;
	title: string;
	onClick?: () => void;
};

export default function DetailsButtonItem(props: Props) {
	return (
		<IonItem
			style={{ "--min-height": isMobile ? "60px" : "" }}
			button
			detail={false}
			lines="none"
			onClick={props.onClick}
		>
			<IonIcon
				className={isMobile ? "ion-color-light-shade" : ""}
				slot="start"
				icon={props.icon}
				size={isPlatform("desktop") ? "small" : ""}
			/>

			<IonLabel className={isMobile ? "ion-color-light-shade" : ""}>
				{props.title}
			</IonLabel>
		</IonItem>
	);
}
