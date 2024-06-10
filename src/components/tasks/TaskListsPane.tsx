import { useRef } from "react";
import { IonItemDivider, IonList, isPlatform } from "@ionic/react";
import { sunny, star, home, list } from "ionicons/icons";

import TaskListItem from "./TaskListItem";
import NewTaskListItem from "./NewTaskListItem";
import useDeleteListActionSheet from "./DeleteTaskListActionSheet";

import TaskList, { todayList, priorityList, tasksList } from "@models/TaskList";

import "./TaskListsPane.css";

interface Props {
	userTaskLists: TaskList[];
	createList: (data: TaskList) => Promise<[boolean, string]>;
	deleteList: (data: TaskList) => Promise<[boolean, string]>;
	minimize?: boolean;
}

export default function TaskListsPane(props: Props) {
	const userListsRef = useRef<HTMLIonListElement>(null);
	const presentDeleteList = useDeleteListActionSheet(props.deleteList);

	const onDeleteList = async (taskList: TaskList) => {
		presentDeleteList(taskList, (deleted) => {
			userListsRef?.current?.closeSlidingItems();
		});
	};

	return (
		<div className="divide-y divide-gray-300">
			{/* Default Lists */}
			<IonList lines={"none"} className={"task-lists-list-desktop"}>
				<TaskListItem
					taskList={todayList}
					icon={sunny}
					minimize={props.minimize}
				/>
				<TaskListItem
					taskList={priorityList}
					icon={star}
					minimize={props.minimize}
				/>
				<TaskListItem
					taskList={tasksList}
					icon={home}
					minimize={props.minimize}
				/>
			</IonList>

			{/* User Lists */}
			<IonList
				ref={userListsRef}
				lines={"none"}
				className={"task-lists-list-desktop"}
			>
				{props.userTaskLists.map((x) => (
					<TaskListItem
						key={x.uid}
						taskList={x}
						icon={list}
						onDeleteList={onDeleteList}
						minimize={props.minimize}
					/>
				))}
				{isPlatform("desktop") ? (
					<NewTaskListItem
						createList={props.createList}
						minimize={props.minimize}
					/>
				) : (
					<></>
				)}
			</IonList>
		</div>
	);
}
