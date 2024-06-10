import {
	IonButton,
	IonIcon,
	IonItem,
	IonLabel,
	isPlatform,
} from "@ionic/react";
import { chevronForwardOutline, chevronDownOutline } from "ionicons/icons";
import { isMobile } from "react-device-detect";

type Props = {
	open: boolean;
	onClick: React.MouseEventHandler<HTMLIonItemElement> | undefined;
};

export default function TaskCompletedItem(props: Props) {
	const color = isMobile ? "light" : undefined;

	return (
		<div className={"holder" + (isMobile ? " mobile" : " desktop")}>
			<IonItem
				className={"task-completed"}
				button
				detail={false}
				lines={isMobile ? "none" : "full"}
				onClick={props.onClick}
			>
				<IonIcon
					color={color}
					size={"small"}
					slot={"start"}
					icon={
						props.open ? chevronDownOutline : chevronForwardOutline
					}
				/>
				<IonLabel color={color} style={{ fontWeight: "bold" }}>
					Completed
				</IonLabel>
			</IonItem>
		</div>
	);
}
