import { isPlatform, IonList, IonItem, IonIcon, IonButton } from "@ionic/react";
import {
	sunny,
	chevronBackOutline,
	chevronForwardOutline,
} from "ionicons/icons";

interface Props {
	minimize: boolean;
	setMinimize: (min: boolean) => void;
}

export default function MinimizeTaskListsPane(props: Props) {
	return (
		<>
			<IonButton
				color={"light"}
				fill={"clear"}
				onClick={(e) => props.setMinimize(!props.minimize)}
			>
				<IonIcon
					color={"dark"}
					icon={
						props.minimize
							? chevronForwardOutline
							: chevronBackOutline
					}
					size={isPlatform("ios") ? "small" : "normal"}
				/>
			</IonButton>
		</>
	);
}
