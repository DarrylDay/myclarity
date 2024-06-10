import {
	IonList,
	IonListHeader,
	IonItem,
	IonLabel,
	IonPopover,
	IonAvatar,
	isPlatform,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuthContext } from "@backend/Auth";

import "./ProfilePopover.css";

type Props = {
	state: {
		showPopover: boolean;
		event: any;
	};
	setState: (state: { showPopover: boolean; event: any }) => void;
	setWelcomeModal: (state: boolean) => void;
};

export default function ProfilePopover(props: Props) {
	const authContext = useAuthContext();
	const location = useLocation();
	const history = useHistory();
	const [currentPage, setCurrentPage] = useState(0);
	const popover = useRef<HTMLIonPopoverElement>(null);

	const onSignOut = async () => {
		await authContext.signOut();
		window.location.reload();
	};

	function onWillDismiss(e?: any) {
		if (history.length == currentPage) {
			props.setState({
				showPopover: false,
				event: undefined,
			});
		}
	}

	return (
		<>
			<IonPopover
				ref={popover}
				isOpen={props.state.showPopover}
				event={props.state.event}
				onWillDismiss={onWillDismiss}
				onWillPresent={(e) => {
					setCurrentPage(history.length);
				}}
				style={{ "--width": "250px" }}
			>
				<IonList>
					<IonListHeader style={{ paddingLeft: "0px" }}>
						<IonItem lines={"none"}>
							<IonAvatar
								slot="start"
								style={{
									"--border-radius": "20%",
									// borderRadius: "21%",
									marginRight: "8px",
									width: isPlatform("desktop")
										? "48px"
										: "32px",
									height: isPlatform("desktop")
										? "48px"
										: "32px",
									// border: "2px solid #393e46",
								}}
							>
								<img
									src={authContext.profileImageURL}
									alt={"Profile"}
								/>
							</IonAvatar>
							<IonLabel>
								<b>{authContext.profileData?.fullName}</b>
								<p>{authContext.profileData?.email}</p>
							</IonLabel>
						</IonItem>
					</IonListHeader>

					<IonItem
						button
						routerLink={"/profile"}
						routerDirection={"root"}
						onClick={(e) => {
							if (location.pathname == "/profile") {
								onWillDismiss();
							} else {
								popover.current?.remove();
							}
						}}
					>
						Profile
					</IonItem>

					<IonItem
						button
						routerLink={isPlatform("desktop") ? undefined : "/help"}
						routerDirection={
							isPlatform("desktop") ? undefined : "root"
						}
						onClick={(e) => {
							if (isPlatform("desktop")) {
								props.setWelcomeModal(true);
								onWillDismiss();
							} else {
								popover.current?.remove();
							}
						}}
					>
						Help
					</IonItem>

					<IonItem
						button
						onClick={() => {
							onWillDismiss();
							onSignOut();
						}}
						lines={"none"}
					>
						Logout
					</IonItem>
				</IonList>
			</IonPopover>
		</>
	);
}
