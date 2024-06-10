import {
	IonContent,
	IonPage,
	IonToolbar,
	IonFooter,
	isPlatform,
} from "@ionic/react";
import { useHistory, RouteComponentProps, useLocation } from "react-router";

import TasksPane from "@components/tasks/TasksPane";
import NewTaskItem from "@components/tasks/NewTaskItem";
import useDeleteListActionSheet from "@components/tasks/DeleteTaskListActionSheet";
import useRenameTaskListAlert from "@components/tasks/RenameTaskListAlert";
import { useTaskListOptionsPopover } from "@components/tasks/TaskListOptionsPopover";

import SubPageHeader from "@components/page/SubPageHeader";

import { useAuthContext } from "@backend/Auth";
import {
	useTasks,
	useUserTaskLists,
	useUserTasksWithList,
} from "@backend/Database";

import { todayList, priorityList, tasksList } from "@models/TaskList";

import { ScrollDetail } from "@ionic/core/dist/types/components/content/content-interface";

import { useState, useEffect } from "react";

import "./TasksPage.css";

import { StatusBar, Style } from "@capacitor/status-bar";

// interface Props
//     extends RouteComponentProps<{
//         listID: string;
//     }> {}

export default function TasksPage() {
	const location = useLocation();
	const history = useHistory();
	const tasksData = useTasks();
	const [titleInHeader, setTitleInHeader] = useState(false);

	const selectedList = tasksData.taskList.selected.value;

	const presentRenameList = useRenameTaskListAlert(tasksData.taskList.update);
	const presentDeleteList = useDeleteListActionSheet(
		tasksData.taskList.delete
	);
	const [present, dimiss] = useTaskListOptionsPopover(
		selectedList,
		() => {
			selectedList && presentRenameList(selectedList);
		},
		() => {
			showDeleteList();
		}
	);

	useEffect(() => {
		if (isPlatform("ios") && isPlatform("capacitor")) {
			StatusBar.setStyle({
				style: Style.Dark,
			});
		}
	});

	useEffect(() => {
		const segs = location.pathname.split("/");

		if (segs.length > 1 && segs[1] == "tasks") {
			tasksData.taskList.selected.setWithID(segs[2]);
		}
	}, [location, tasksData]);

	function showDeleteList() {
		if (selectedList && selectedList.isUserList) {
			presentDeleteList(selectedList, (deleted) => {
				if (deleted) history.goBack();
			});
		}
	}

	function handleTasksScroll(e: CustomEvent<ScrollDetail>) {
		if (e.detail.currentY >= 50 && !titleInHeader) {
			setTitleInHeader(true);
		} else if (e.detail.currentY < 50 && titleInHeader) {
			setTitleInHeader(false);
		}
	}

	return (
		<>
			<SubPageHeader
				defaultHref={"/tasks"}
				color={"primary"}
				backButtonText={"Lists"}
				title={titleInHeader ? selectedList?.name : undefined}
				buttonClick={(e) => {
					present({ event: e.nativeEvent });
				}}
			/>

			<IonContent
				className={"coloredBG"}
				scrollEvents={true}
				onIonScroll={handleTasksScroll}
				forceOverscroll={true}
			>
				<TasksPane
					tasks={tasksData.task.values}
					tasksReady={tasksData.tasksReady}
					taskList={selectedList}
					updateTask={tasksData.task.update}
					deleteTask={tasksData.task.delete}
					udpateTaskList={tasksData.taskList.update}
				/>
			</IonContent>

			<IonFooter className={"no-bg-footer"}>
				<IonToolbar className={"new-task-toolbar"} color={"primary"}>
					<NewTaskItem
						taskList={selectedList}
						createTask={tasksData.task.create}
					/>
				</IonToolbar>
			</IonFooter>
		</>
	);
}
