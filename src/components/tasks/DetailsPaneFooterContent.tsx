import {
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonIcon,
	isPlatform,
} from "@ionic/react";
import { useHistory } from "react-router";
import { trashOutline } from "ionicons/icons";
import { isMobile } from "react-device-detect";

import useDeleteTaskActionSheet from "@components/tasks/DeleteTaskActionSheet";
import { useTasks } from "@backend/Database";
import useDeleteTaskAlert from "./DeleteTaskAlert";

//import "./DetailsPaneFooterContent.css";

type Props = {};

export default function DetailsPaneFooterContent(props: Props) {
	const tasksData = useTasks();
	const history = useHistory();

	const presentDeleteTaskSheet = useDeleteTaskActionSheet(
		tasksData.task.delete
	);
	const presentDeleteTaskAlert = useDeleteTaskAlert(tasksData.task.delete);

	function handleDeleteTask() {
		const present = isPlatform("desktop")
			? presentDeleteTaskAlert
			: presentDeleteTaskSheet;

		if (tasksData.task.selected.value) {
			present(tasksData.task.selected.value, (deleted) => {
				if (deleted) {
					history.goBack();
				}
			});
		}
	}

	return (
		<IonToolbar
			//hidden={tasksData.task.selected.value ? false : true}
			color={isMobile ? "primary" : "light"}
			style={{
				position: isPlatform("desktop") ? "absolute" : "",
				bottom: isPlatform("desktop") ? "55px" : "",
			}}
		>
			<IonTitle
				color={isMobile ? "light" : undefined}
				style={{
					fontSize: isPlatform("desktop") ? "14px" : "",
				}}
			>
				{"Created " +
					(tasksData.task.selected.value
						? tasksData.task.selected.value.createdDate
						: "")}
			</IonTitle>

			<IonButtons slot="end">
				<IonButton id="task-delete-button" onClick={handleDeleteTask}>
					<IonIcon slot="icon-only" icon={trashOutline} />
				</IonButton>
			</IonButtons>
		</IonToolbar>
	);
}
