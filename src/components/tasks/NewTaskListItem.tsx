import { IonLabel, IonItem, IonIcon, isPlatform } from "@ionic/react";
import { add } from "ionicons/icons";

import TaskList from "@models/TaskList";

import useNewTaskListAlert from "./NewTaskListAlert";

type Props = {
	createList: (data: TaskList) => Promise<[boolean, string]>;
	minimize?: boolean;
};

export default function NewTaskListItem(props: Props) {
	const presentNewTaskListAlert = useNewTaskListAlert(props.createList);

	return (
		<IonItem
			id="new-task-list-item"
			lines={"none"}
			color={isPlatform("desktop") ? "light" : undefined}
			button
			detail={false}
			onClick={presentNewTaskListAlert}
		>
			<IonIcon
				color={"primary"}
				icon={add}
				slot={!props.minimize ? "start" : ""}
			/>

			{!props.minimize && <IonLabel color={"primary"}>New List</IonLabel>}
		</IonItem>
	);
}
