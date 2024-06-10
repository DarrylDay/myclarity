import {
	IonContent,
	IonList,
	IonItem,
	IonLabel,
	IonIcon,
	IonItemDivider,
	isPlatform,
} from "@ionic/react";
import Task from "@models/Task";
import DetailsTaskItem from "./DetailsTaskItem";
import DetailsButtonItem from "./DetailsButtonItem";
import { sunny, sunnyOutline, documentAttach, pencil } from "ionicons/icons";
import { isMobile } from "react-device-detect";

import "./TaskDetailsPane.css";
import { useNotifictions } from "@components/NotificationManager";

interface Props {
	task: Task | undefined;
	updateTask: (task: Task) => void;
	deleteTask: (task: Task) => void;
}

export default function TaskDetailsPane(props: Props) {
	const [createNotification] = useNotifictions();

	function handleTodayClick() {
		if (props.task) {
			props.task.toggleToday();
			props.updateTask(props.task);
		}
	}

	return (
		<>
			<IonList
				style={{
					padding: isPlatform("desktop") ? "0px" : "",
					margin: isPlatform("desktop") ? "16px" : "",
				}}
			>
				{props.task && (
					<>
						<DetailsTaskItem
							key={props.task.uid}
							task={props.task}
							updateTask={props.updateTask}
							deleteTask={props.deleteTask}
						/>

						{isMobile ? (
							<hr className={"divider"} />
						) : (
							<IonItem
								style={{ height: "16px" }}
								lines={"none"}
								color={"light"}
							/>
						)}

						<DetailsButtonItem
							icon={props.task.today ? sunny : sunnyOutline}
							title={
								props.task.today
									? "Remove from Today"
									: "Add to Today"
							}
							onClick={handleTodayClick}
						/>

						<hr className={"divider"} />

						<DetailsButtonItem
							icon={documentAttach}
							title={"Add Attachment"}
							onClick={() => {
								createNotification("Info", "Coming Soon");
							}}
						/>

						<hr className={"divider"} />

						<DetailsButtonItem
							icon={pencil}
							title={"Add Note"}
							onClick={() => {
								createNotification("Info", "Coming Soon");
							}}
						/>

						{isMobile && <hr className={"divider"} />}
					</>
				)}
			</IonList>
		</>
	);
}
