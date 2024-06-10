import {
	IonButton,
	IonCheckbox,
	IonIcon,
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
	IonText,
	isPlatform,
} from "@ionic/react";
import { starOutline, star, trash, sunny, sunnyOutline } from "ionicons/icons";
import Task from "@models/Task";
import { isMobile } from "react-device-detect";

import "./DetailsTaskItem.css";

type Props = {
	task: Task;
	updateTask: (task: Task) => void;
	deleteTask: (task: Task) => void;
};

export default function DetailsTaskItem(props: Props) {
	function handleCompleteToggle(
		e: React.MouseEvent<HTMLIonCheckboxElement, MouseEvent>
	) {
		e.stopPropagation();
		props.task.completed = !props.task.completed;
		props.updateTask(props.task);
	}

	function handlePriorityToggle(
		e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
	) {
		e.stopPropagation();
		e.preventDefault();
		props.task.priority = !props.task.priority;
		props.updateTask(props.task);
	}

	const color = isMobile ? "light" : undefined;

	return (
		<IonItem
			style={{
				"--min-height": "80px",
				marginRight: "6px",
				"--inner-padding-end": "0px",
			}}
			//color={isPlatform("desktop") ? "light" : undefined}
			lines={"none"}
		>
			{/* Fix checkbox wonky on large labels */}
			<IonCheckbox
				className={"task-checkbox"}
				slot={"start"}
				color={color}
				onClick={handleCompleteToggle}
				checked={props.task.completed}
			/>

			<IonLabel
				className={
					"whitespace-normal details-task-item-text" +
					(isPlatform("desktop") ? " desktop" : "")
				}
				color={color}
			>
				{props.task.completed ? (
					<s>{props.task.name}</s>
				) : (
					props.task.name
				)}
			</IonLabel>

			<IonButton
				slot={"end"}
				fill={"clear"}
				onClick={handlePriorityToggle}
			>
				<IonIcon
					icon={props.task.priority ? star : starOutline}
					color={
						isMobile
							? "light"
							: props.task.priority
							? "primary"
							: "dark"
					}
				/>
			</IonButton>
		</IonItem>
	);
}
