import {
	isPlatform,
	IonLabel,
	IonItemSliding,
	IonItem,
	IonItemOptions,
	IonItemOption,
	IonIcon,
} from "@ionic/react";
import { PageSlideTransition } from "@utils/Animations";
import TaskList from "@models/TaskList";
import { useTasks } from "@backend/Database";
import { isMobile } from "react-device-detect";

import "./TaskListItem.css";

type Props = {
	icon: string;
	taskList: TaskList;
	onDeleteList?: (taskList: TaskList) => void;
	minimize?: boolean;
};

export default function TaskListItem(props: Props) {
	const tasksData = useTasks();

	function deleteList() {
		if (props.onDeleteList) {
			props.onDeleteList(props.taskList);
		}
	}

	const selected =
		isPlatform("desktop") &&
		tasksData.taskList.selected.value?.isSame(props.taskList);

	return (
		<IonItemSliding disabled={isPlatform("desktop") ? true : false}>
			<IonItem
				lines={"none"}
				className={
					isPlatform("desktop")
						? "task-list-item" + (selected ? " selected" : "")
						: undefined
				}
				button
				detail={false}
				routerAnimation={isMobile ? PageSlideTransition : undefined}
				routerLink={"/tasks/" + props.taskList.RouterLink}
				onClick={(e) =>
					isMobile &&
					tasksData.taskList.selected.setWithID(
						props.taskList.RouterLink
					)
				}
			>
				<IonIcon
					color={"primary"}
					slot={!props.minimize ? "start" : ""}
					icon={props.icon}
					size={isPlatform("ios") ? "small" : "normal"}
				/>

				{!props.minimize && (
					<IonLabel color={selected ? "primary" : undefined}>
						{props.taskList.name}
					</IonLabel>
				)}
			</IonItem>

			{props.onDeleteList && (
				<IonItemOptions side="end" onIonSwipe={deleteList}>
					<IonItemOption
						color="danger"
						expandable
						onClick={deleteList}
					>
						Delete
					</IonItemOption>
				</IonItemOptions>
			)}
		</IonItemSliding>
	);
}
