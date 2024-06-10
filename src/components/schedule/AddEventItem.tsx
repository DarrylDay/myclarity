import {
	IonButton,
	IonIcon,
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
	isPlatform,
} from "@ionic/react";
import { starOutline, star, trash, sunny, sunnyOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import EventData from "@models/EventData";
import { isMobile } from "react-device-detect";

// import "./AddEventItem.css";

type Props = {
	id: string;
	title: string;
	subtitle: string;
	event?: EventData;
};

export default function AddEventItem(props: Props) {
	const itemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
	const [isDragging, setDragging] = useState(false);

	return (
		<div className={"holder" + (isMobile ? " mobile" : " desktop")}>
			<IonItemSliding
				ref={itemSlidingRef}
				disabled={
					isPlatform("desktop") ? true : isDragging ? true : false
				}
			>
				<IonItem
					className={
						"fc-event task-item-" +
						(isPlatform("desktop") ? "desktop " : "mobile ") +
						(isPlatform("ios") ? "ios " : "")
					}
					button
					detail={false}
					key={props.id}
					lines={isPlatform("desktop") ? "full" : "none"}
					onDragCapture={(e) => console.log(e)}
				>
					<IonLabel
					// className="whitespace-normal"
					>
						<h3>{props.title}</h3>
						<p>{props.subtitle}</p>
					</IonLabel>

					{/* <IonButton slot={"end"} fill={"clear"} onClick={handlePriorityToggle} >
                        <IonIcon icon={props.task.priority ? star : starOutline} color={props.task.priority ? "primary" : "dark"} />
                    </IonButton> */}
				</IonItem>

				<IonItemOptions
					className="task-sliding"
					side="end"
					onIonSwipe={undefined}
				>
					<IonItemOption
						className="task-sliding"
						color="danger"
						expandable
						onClick={undefined}
					>
						<IonIcon icon={trash} className={"task-slide-icon"} />
					</IonItemOption>
				</IonItemOptions>
			</IonItemSliding>
		</div>
	);
}
