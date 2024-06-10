import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonButton,
	IonTitle,
	IonIcon,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import ProfilePopover from "@components/profile/ProfilePopover";

import "./PageHeader.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DesktopModal from "@components/DesktopModal";
import WelcomeSlides from "@components/help/WelcomeSlides";
import { useAuthContext } from "@backend/Auth";
import { isPlatform } from "@ionic/core";

type Props = {
	name?: string;
};

export default function PageHeader(props: Props) {
	const authContext = useAuthContext();
	const location = useLocation();
	const page = location.pathname.split("/")[1];
	const pageCapitalize = page.charAt(0).toUpperCase() + page.slice(1);

	const [popoverState, setPopoverState] = useState<{
		showPopover: boolean;
		event: any | undefined;
	}>({ showPopover: false, event: undefined });

	const [welcomeModal, setWelcomeModal] = useState(false);

	useEffect(() => {
		if (authContext.profileData && !authContext.profileData.welcomeRead) {
			if (isPlatform("desktop")) setWelcomeModal(true);
			else window.location.href = "/help";
		}
	}, [authContext.profileData]);

	return (
		<>
			<IonHeader>
				<IonToolbar color={"primary"}>
					<IonButtons slot="start">
						<IonMenuButton autoHide={false} />
					</IonButtons>

					<IonTitle className={"top-bar-title"}>
						my<b>{props.name ? props.name : pageCapitalize}</b>
					</IonTitle>

					<IonButtons slot="end">
						<IonButton
							onClick={(e) => {
								setPopoverState({
									showPopover: true,
									event: e.nativeEvent,
								});
							}}
						>
							<IonIcon
								icon={personCircleOutline}
								size={"large"}
							/>
						</IonButton>
					</IonButtons>
				</IonToolbar>

				<ProfilePopover
					state={popoverState}
					setState={setPopoverState}
					setWelcomeModal={setWelcomeModal}
				/>
			</IonHeader>

			{welcomeModal && (
				<DesktopModal>
					<WelcomeSlides
						onFinished={() => {
							setWelcomeModal(false);
						}}
					/>
				</DesktopModal>
			)}
		</>
	);
}
