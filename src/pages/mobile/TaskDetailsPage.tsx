import { useEffect } from "react";
import { IonContent, IonFooter, IonPage, isPlatform } from "@ionic/react";
import { RouteComponentProps, useLocation } from "react-router";

import TaskDetailsPane from "@components/tasks/TaskDetailsPane";
import DetailsPaneFooterContent from "@components/tasks/DetailsPaneFooterContent";
import SubPageHeader from "@components/page/SubPageHeader";
import { useTasks } from "@backend/Database";

import { StatusBar, Style } from "@capacitor/status-bar";

export default function TaskDetailsPage() {
	const location = useLocation();
	const tasksData = useTasks();

	const selectedTask = tasksData.task.selected.value;

	const segs = location.pathname.split("/");

	useEffect(() => {
		if (segs.length > 2 && segs[1] == "tasks") {
			tasksData.taskList.selected.setWithID(segs[2]);
			tasksData.task.selected.setWithID(segs[3]);
		}
	}, [location, tasksData]);

	useEffect(() => {
		if (isPlatform("ios") && isPlatform("capacitor")) {
			StatusBar.setStyle({
				style: Style.Dark,
			});
		}
	});

	return (
		<>
			<SubPageHeader
				color={"primary"}
				defaultHref={segs.length > 2 ? "/tasks/" + segs[1] : undefined}
				backButtonText={
					tasksData.taskList.selected.value
						? tasksData.taskList.selected.value.name
						: "Tasks"
				}
			/>

			<IonContent className={"coloredBG"} forceOverscroll={false}>
				<TaskDetailsPane
					task={selectedTask}
					updateTask={tasksData.task.update}
					deleteTask={tasksData.task.delete}
				/>
			</IonContent>

			<IonFooter>
				<DetailsPaneFooterContent />
			</IonFooter>
		</>
	);
}
