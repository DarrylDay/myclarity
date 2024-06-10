import { useLocation } from "react-router";
import { IonPage, IonContent, IonButton, useIonPopover } from "@ionic/react";
import PageHeader from "@components/page/PageHeader";
import ProfilePopoverList from "@components/profile/ProfilePopoverList";
import { GridExample } from "@components/debug/TestComp";

export default function ComingSoonPage() {
	const location = useLocation();
	const [present, dismiss] = useIonPopover(ProfilePopoverList, {
		onHide: () => dismiss(),
		onSignOut: () => {},
		userName: "",
		userEmail: "",
	});

	const page = location.pathname.split("/")[1];
	const pageCapitalize = page.charAt(0).toUpperCase() + page.slice(1);

	return (
		<>
			<PageHeader name={pageCapitalize} />
			<IonContent forceOverscroll={false}>
				{/* <h6>Coming Soon.</h6> */}
				{/* <ProfilePopoverList
                    onHide={() => {}}
                    onSignOut={() => {}}
                    userName=""
                    userEmail=""
                /> */}
				{/* <IonButton onClick={(e) => {present({event: e.nativeEvent});}} >
                    <IonIcon icon={personCircleOutline} size={"large"} />
                    Test
                </IonButton>
                <PopoverExample /> */}
				{/* <GridExample /> */}

				<div
					className="container"
					style={{
						height: "100%",
						display: "flex",
						flexFlow: "column nowrap",
						alignItems: "stretch",
					}}
				>
					<div
						style={{
							border: "1px #ccc solid",
							flex: 1,
						}}
					>
						<h3>Box 1</h3>
						<p>Some awesome text</p>
						<IonButton routerLink={"/tasks"}>Get Started</IonButton>
					</div>

					<div
						style={{
							border: "1px #ccc solid",
							flex: 1,
						}}
					>
						<h3>Box 2</h3>
						<p>Some awesome text</p>
					</div>
				</div>
			</IonContent>
		</>
	);
}
