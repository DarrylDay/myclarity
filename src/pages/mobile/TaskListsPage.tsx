import {
	IonPage,
	IonContent,
	IonFooter,
	IonToolbar,
	IonButton,
	isPlatform,
} from "@ionic/react";

import TaskListsPane from "@components/tasks/TaskListsPane";
import NewTaskListItem from "@components/tasks/NewTaskListItem";
import PageHeader from "@components/page/PageHeader";

import { useTasks } from "@backend/Database";

import { StatusBar, Style } from "@capacitor/status-bar";
import { useEffect } from "react";

interface Props {}

export default function TaskListsPage(props: Props) {
	const tasksData = useTasks();

	useEffect(() => {
		if (isPlatform("ios") && isPlatform("capacitor")) {
			StatusBar.setStyle({
				style: Style.Dark,
			});
		}
	});

	return (
		<>
			<PageHeader name={"Tasks"} />

			<IonContent forceOverscroll={true}>
				<TaskListsPane
					userTaskLists={tasksData.taskList.values}
					createList={tasksData.taskList.create}
					deleteList={tasksData.taskList.delete}
					minimize={false}
				/>
			</IonContent>

			<IonFooter>
				<IonToolbar>
					<NewTaskListItem createList={tasksData.taskList.create} />
				</IonToolbar>
			</IonFooter>
		</>
	);
}
