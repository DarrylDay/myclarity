import { useRef } from "react";
import { isPlatform } from "@ionic/core";
import {
	IonHeader,
	IonContent,
	IonList,
	IonListHeader,
	IonText,
} from "@ionic/react";
import {
	listOutline,
	golfOutline,
	alarmOutline,
	calendarOutline,
	happyOutline,
	fastFoodOutline,
	beerOutline,
	journalOutline,
	peopleOutline,
	fitnessOutline,
	hammerOutline,
	documentsOutline,
	createOutline,
} from "ionicons/icons";

import "./NavMenuContent.css";
import NavMenuItem from "./NavMenuItem";

type Props = {
	onMenuItemClick: () => void;
};

export default function NavMenuContent(props: Props) {
	const headerClass = "text-lg font-semibold";

	return (
		<>
			<IonHeader>
				<img
					className={"nav-menu-logo"}
					src={"assets/logo.svg"}
					alt="myClarity Logo"
				/>
			</IonHeader>

			<IonContent>
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
							flex: 1,
						}}
					>
						<IonList>
							<IonListHeader>
								<IonText color={"primary"}>
									<h5 className={headerClass}>Plan</h5>
								</IonText>
							</IonListHeader>
							<NavMenuItem
								name={"Tasks"}
								icon={listOutline}
								routerLink={
									isPlatform("desktop")
										? "/tasks/tasks"
										: "/tasks"
								}
								onClick={props.onMenuItemClick}
							/>
							<NavMenuItem
								name={"Goals"}
								icon={golfOutline}
								routerLink={"/goals"}
								onClick={props.onMenuItemClick}
								disabled
							/>
							<NavMenuItem
								name={"Routines"}
								icon={alarmOutline}
								routerLink={"/routines"}
								onClick={props.onMenuItemClick}
								disabled
							/>
							<NavMenuItem
								name={"Schedule"}
								icon={calendarOutline}
								routerLink={"/schedule"}
								onClick={props.onMenuItemClick}
								disabled
							/>

							<IonListHeader>
								<IonText color={"primary"}>
									<h5 className={headerClass}>Mind</h5>
								</IonText>
							</IonListHeader>
							<NavMenuItem
								name={"Mood"}
								icon={happyOutline}
								routerLink={"/mood"}
								onClick={props.onMenuItemClick}
								disabled
							/>
							<NavMenuItem
								name={"Journal"}
								icon={journalOutline}
								routerLink={"/journal"}
								onClick={props.onMenuItemClick}
								disabled
							/>
							<NavMenuItem
								name={"Social"}
								icon={peopleOutline}
								routerLink={"/social"}
								onClick={props.onMenuItemClick}
								disabled
							/>

							<IonListHeader>
								<IonText color={"primary"}>
									<h5 className={headerClass}>Body</h5>
								</IonText>
							</IonListHeader>
							<NavMenuItem
								name={"Diet"}
								icon={fastFoodOutline}
								routerLink={"/diet"}
								onClick={props.onMenuItemClick}
								disabled
							/>
							<NavMenuItem
								name={"Consumptions"}
								icon={beerOutline}
								routerLink={"/consumptions"}
								onClick={props.onMenuItemClick}
								disabled
							/>
							<NavMenuItem
								name={"Fitness"}
								icon={fitnessOutline}
								routerLink={"/fitness"}
								onClick={props.onMenuItemClick}
								disabled
							/>

							<IonListHeader>
								<IonText color={"primary"}>
									<h5 className={headerClass}>Knowledge</h5>
								</IonText>
							</IonListHeader>
							<NavMenuItem
								name={"Skills"}
								icon={hammerOutline}
								routerLink={"/skills"}
								onClick={props.onMenuItemClick}
								disabled
							/>
							<NavMenuItem
								name={"Records"}
								icon={documentsOutline}
								routerLink={"/records"}
								onClick={props.onMenuItemClick}
								disabled
							/>
							<NavMenuItem
								name={"Notes"}
								icon={createOutline}
								routerLink={"/notes"}
								onClick={props.onMenuItemClick}
								disabled
							/>
						</IonList>
					</div>
				</div>
			</IonContent>
		</>
	);
}
