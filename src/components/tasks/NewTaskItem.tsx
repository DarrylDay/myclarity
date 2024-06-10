import {
	IonItem,
	IonIcon,
	IonCheckbox,
	IonInput,
	isPlatform,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import Task from "@models/Task";
import TaskList from "@models/TaskList";
import { isMobile } from "react-device-detect";

import "./NewTaskItem.css";

type Props = {
	taskList: TaskList | undefined;
	createTask: (task: Task) => Promise<[boolean, string]>;
};

export default function NewTaskItem(props: Props) {
	const [taskName, setTaskName] = useState("");
	const [selected, setSelected] = useState(false);

	const attemptCreateTask = () => {
		const trimmedName = taskName.trim();
		console.log(trimmedName);
		if (trimmedName.length > 0 && props.taskList) {
			const taskList = Task.Create(trimmedName, props.taskList);
			props.createTask(taskList);
			setTaskName("");
		}
	};

	return (
		<>
			<IonItem
				id="new-task-item"
				lines={isPlatform("desktop") ? "full" : "none"}
				className={
					isMobile
						? !selected
							? "new-task-item"
							: "new-task-item-selected"
						: undefined
				}
				style={{
					marginLeft: "12px",
					marginRight: "12px",
				}}
			>
				<IonIcon
					slot={"start"}
					color={"primary"}
					icon={add}
					hidden={selected}
				/>

				<IonCheckbox slot={"start"} disabled hidden={!selected} />

				<form
					className={"new-task-input"}
					onSubmit={(e) => {
						attemptCreateTask();
						e.preventDefault();
					}}
				>
					<IonInput
						value={taskName}
						type={"text"}
						placeholder={"New Task"}
						onFocus={(e) => {
							setSelected(true);
						}}
						onBlur={(e) => {
							setSelected(false);
							setTaskName("");
						}}
						onIonChange={(e) => {
							setTaskName((e.target as HTMLInputElement).value);
						}}
						maxlength={120}
					/>
				</form>
			</IonItem>
		</>
	);
}
