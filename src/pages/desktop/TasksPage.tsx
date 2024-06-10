import { IonContent, IonGrid, IonPage, IonRow, IonCol } from "@ionic/react";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

import TaskListsPane from "@components/tasks/TaskListsPane";
import MinimizeTaskListsPane from "@components/tasks/MinimizeTaskListsPane";
import TasksPane from "@components/tasks/TasksPane";
import NewTaskItem from "@components/tasks/NewTaskItem";
import TaskDetailsPane from "@components/tasks/TaskDetailsPane";
import DetailsPaneFooterContent from "@components/tasks/DetailsPaneFooterContent";
import PageHeader from "@components/page/PageHeader";

import { useTasks } from "@backend/Database";

import "./TasksPage.css";

export default function TasksPage() {
	const tasksData = useTasks();
	const location = useLocation();

	const [minimize, setMinimize] = useState(false);

	useEffect(() => {
		if (location.pathname === "/tasks")
			window.location.href = "/tasks/tasks";

		const paths = location.pathname.split("/");

		if (paths.length > 2) {
			tasksData.taskList.selected.setWithID(paths[2]);
		} else {
			tasksData.taskList.selected.setter(undefined);
		}

		if (paths.length > 3) {
			tasksData.task.selected.setWithID(paths[3]);
		} else {
			tasksData.task.selected.setter(undefined);
		}
	}, [tasksData]);

	return (
		<>
			<PageHeader name={"Tasks"} />

			<IonGrid className={"task-page-grid"}>
				<IonRow className={"task-page-row"}>
					<IonCol
						size={minimize ? "auto" : "2"}
						className={"task-page-col"}
						color={"medium"}
						style={{
							maxWidth: "400px",
							minWidth: minimize ? "56px" : "250px",
						}}
					>
						<IonContent style={{ width: "auto" }} color={"light"}>
							<MinimizeTaskListsPane
								minimize={minimize}
								setMinimize={setMinimize}
							/>

							<TaskListsPane
								userTaskLists={tasksData.taskList.values}
								createList={tasksData.taskList.create}
								deleteList={tasksData.taskList.delete}
								minimize={minimize}
							/>
						</IonContent>
					</IonCol>

					<IonCol
						className={"task-page-col middle"}
						style={{
							display: "flex",
							flexFlow: "column",
							height: "100%",
						}}
					>
						<div className={"pl-8 py-6"}>
							<h1 className="text-2xl font-semibold">
								{tasksData.taskList.selected.value?.name}
							</h1>
						</div>

						<NewTaskItem
							taskList={tasksData.taskList.selected.value}
							createTask={tasksData.task.create}
						/>

						<IonContent style={{ flexGrow: "1" }}>
							<TasksPane
								taskList={tasksData.taskList.selected.value}
								tasks={tasksData.task.values}
								selectedTask={tasksData.task.selected.value}
								tasksReady={tasksData.tasksReady}
								updateTask={tasksData.task.update}
								deleteTask={tasksData.task.delete}
								udpateTaskList={tasksData.taskList.update}
							/>
						</IonContent>
					</IonCol>

					<IonCol
						size={tasksData.task.selected.value ? "2.5" : "0"}
						className={"task-page-col"}
						style={{
							maxWidth: "400px",
							minWidth: tasksData.task.selected.value
								? "300px"
								: "0px",
						}}
					>
						<IonContent color={"light"}>
							<TaskDetailsPane
								task={tasksData.task.selected.value}
								updateTask={tasksData.task.update}
								deleteTask={tasksData.task.delete}
							/>

							{/* <div style={{"height": "length"}} /> */}

							<DetailsPaneFooterContent />
						</IonContent>
					</IonCol>
				</IonRow>
			</IonGrid>
		</>
	);
}
