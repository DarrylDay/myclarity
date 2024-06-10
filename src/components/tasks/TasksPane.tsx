import { IonList, IonListHeader, isPlatform } from "@ionic/react";
import { isMobile } from "react-device-detect";

import TaskItem from "./TaskItem";
import TaskCompletedItem from "./TaskCompletedItem";
import { useEffect, useRef, useState } from "react";

import Task from "@models/Task";
import TaskList, { tasksList } from "@models/TaskList";

type Props = {
	taskList: TaskList | undefined;
	tasks: Task[];
	selectedTask?: Task;
	tasksReady: boolean;
	updateTask: (task: Task) => Promise<[boolean, string]>;
	deleteTask: (task: Task) => Promise<[boolean, string]>;
	udpateTaskList: (task: TaskList) => Promise<[boolean, string]>;
};

export default function TasksPane(props: Props) {
	const [completedOpen, setCompletedOpen] = useState(false);
	const activeTasks = props.tasks.filter((x) => !x.completed);
	const completedTasks = props.tasks.filter((x) => x.completed);

	function toggleCompleted() {
		if (props.taskList) {
			props.taskList.completedOpen = !props.taskList.completedOpen;
			setCompletedOpen(props.taskList.completedOpen);
			props.udpateTaskList(props.taskList);
		}
	}

	useEffect(() => {
		setCompletedOpen(props.taskList ? props.taskList.completedOpen : false);
	}, [props.taskList]);

	return (
		<>
			<IonList
				lines={"none"}
				style={isPlatform("desktop") ? { padding: "0px" } : undefined}
			>
				{isMobile && (
					<IonListHeader
						color={"primary"}
						style={{ paddingRight: "20px" }}
					>
						<h1 className="text-2xl font-semibold">
							{props.taskList && props.taskList.name}
						</h1>
					</IonListHeader>
				)}

				{activeTasks.map(
					(x) =>
						x.listUID == props.taskList?.uid &&
						props.tasksReady && (
							<TaskItem
								key={x.uid}
								task={x}
								updateTask={props.updateTask}
								deleteTask={props.deleteTask}
								selected={x.uid == props.selectedTask?.uid}
								selectedListURL={
									props.taskList
										? props.taskList.RouterLink
										: x.listUID
								}
							/>
						)
				)}

				{completedTasks.length > 0 && props.tasksReady && (
					<TaskCompletedItem
						open={completedOpen}
						onClick={(e) => {
							toggleCompleted();
						}}
					/>
				)}

				{completedOpen &&
					props.tasksReady &&
					completedTasks.map((x) => (
						<TaskItem
							key={x.uid}
							task={x}
							updateTask={props.updateTask}
							deleteTask={props.deleteTask}
							selected={x.uid == props.selectedTask?.uid}
							selectedListURL={
								props.taskList
									? props.taskList.RouterLink
									: x.listUID
							}
						/>
					))}
			</IonList>
		</>
	);
}
