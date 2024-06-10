import {
	IonButton,
	IonCheckbox,
	IonIcon,
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
	isPlatform,
} from "@ionic/react";
import { starOutline, star, trash, sunny, sunnyOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import Task from "@models/Task";

import { PageSlideTransition } from "@utils/Animations";
import TaskPopover from "./TaskPopover";
import { isMobile } from "react-device-detect";

import "./TaskItem.css";

type Props = {
	task: Task;
	updateTask: (task: Task) => void;
	deleteTask: (task: Task) => void;
	selected: boolean;
	selectedListURL: string;
};

export default function TaskItem(props: Props) {
	const itemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
	const [popoverState, setPopoverState] = useState<{
		showPopover: boolean;
		event: any | undefined;
	}>({ showPopover: false, event: undefined });

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

	function handleToggleToday() {
		props.task.toggleToday();
		props.updateTask(props.task);
		itemSlidingRef.current?.close();
	}

	function handleDeleteTask() {
		props.deleteTask(props.task);
		itemSlidingRef.current?.close();
	}

	return (
		<div className={"holder" + (isMobile ? " mobile" : " desktop")}>
			<IonItemSliding
				ref={itemSlidingRef}
				disabled={isPlatform("desktop") ? true : false}
				onContextMenu={(e) => {
					e.preventDefault();
					setPopoverState({
						showPopover: true,
						event: e.nativeEvent,
					});
				}}
			>
				{!props.task.completed && (
					<IonItemOptions
						className="task-sliding"
						side="start"
						onIonSwipe={handleToggleToday}
					>
						<IonItemOption
							className="task-sliding"
							color="dark"
							expandable
							onClick={handleToggleToday}
						>
							<IonIcon
								icon={props.task.today ? sunnyOutline : sunny}
								className={"task-slide-icon"}
							/>
						</IonItemOption>
					</IonItemOptions>
				)}

				<IonItem
					className={
						"task-item-" +
						(isPlatform("desktop") ? "desktop " : "mobile ") +
						(isPlatform("ios")
							? "ios "
							: "" + (props.selected ? "selected " : ""))
					}
					// style={isPlatform("desktop") ? {"--inner-padding-end": "0px"} : undefined}
					button
					detail={false}
					lines={isPlatform("desktop") ? "full" : "none"}
					routerAnimation={isMobile ? PageSlideTransition : undefined}
					routerLink={
						props.selected
							? "/tasks/" + props.selectedListURL
							: "/tasks/" +
							  props.selectedListURL +
							  "/" +
							  props.task.uid
					}
				>
					{/* TODO: Fix checkbox wonky on large labels */}
					<IonCheckbox
						className={"task-checkbox"}
						slot={"start"}
						color={"primary"}
						onClick={handleCompleteToggle}
						checked={props.task.completed}
					/>

					<IonLabel
						className="whitespace-normal"
						color={props.task.completed ? "medium" : ""}
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
							color={props.task.priority ? "primary" : "dark"}
						/>
					</IonButton>
				</IonItem>

				<IonItemOptions
					className="task-sliding"
					side="end"
					onIonSwipe={handleDeleteTask}
				>
					<IonItemOption
						className="task-sliding"
						color="danger"
						expandable
						onClick={handleDeleteTask}
					>
						<IonIcon icon={trash} className={"task-slide-icon"} />
					</IonItemOption>
				</IonItemOptions>

				<TaskPopover state={popoverState} setState={setPopoverState} />
			</IonItemSliding>
		</div>
	);
}
