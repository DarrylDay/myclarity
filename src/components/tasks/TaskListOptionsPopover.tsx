import {
	IonList,
	IonListHeader,
	IonItem,
	IonText,
	useIonPopover,
} from "@ionic/react";

import TaskList from "@models/TaskList";

type Props = {
	onHide: () => void;
	taskList: TaskList | undefined;
	onRename: () => void;
	onDelete: () => void;
};

export function TaskListOptionsList(props: Props) {
	return (
		<IonList>
			<IonListHeader>
				<h4>List Options</h4>
			</IonListHeader>

			{props.taskList && props.taskList.isUserList && (
				<>
					<IonItem
						button
						detail={false}
						onClick={() => {
							props.onRename();
							props.onHide();
						}}
					>
						Rename List
					</IonItem>

					<IonItem
						button
						detail={false}
						onClick={() => {
							props.onDelete();
							props.onHide();
						}}
						lines={"none"}
					>
						<IonText color="danger">Delete List</IonText>
					</IonItem>
				</>
			)}
		</IonList>
	);
}

export function useTaskListOptionsPopover(
	taskList: TaskList | undefined,
	onRename: () => void,
	onDelete: () => void
) {
	const [present, dismiss] = useIonPopover(TaskListOptionsList, {
		onHide: () => dismiss(),
		taskList: taskList,
		onRename: () => onRename(),
		onDelete: () => onDelete(),
	});

	return [present, dismiss];
}
