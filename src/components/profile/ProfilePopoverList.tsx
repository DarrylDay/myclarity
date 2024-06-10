import { IonList, IonListHeader, IonItem, IonLabel } from "@ionic/react";
import { PageFadeTransition } from "@utils/Animations";

type Props = {
	onHide: () => void;
	onSignOut: () => void;
	userName: string | undefined;
	userEmail: string | undefined;
};

export default function ProfilePopoverList(props: Props) {
	return (
		<IonList>
			<IonListHeader>
				<h4>{props.userName}</h4>
			</IonListHeader>

			<IonItem
				button
				routerLink={"/profile"}
				routerDirection={"root"}
				onClick={(e) => {
					props.onHide();
				}}
			>
				Profile
			</IonItem>

			<IonItem
				button
				routerLink={"/goals"}
				routerAnimation={PageFadeTransition}
				//routerDirection={"root"}
				onClick={(e) => {
					e.preventDefault();
					props.onHide();
				}}
			>
				<IonLabel>Test</IonLabel>
			</IonItem>

			<IonItem
				button
				onClick={() => {
					props.onSignOut();
				}}
				lines={"none"}
			>
				Logout
			</IonItem>
		</IonList>
	);
}
