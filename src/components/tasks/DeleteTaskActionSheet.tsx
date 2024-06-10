import { useIonActionSheet } from "@ionic/react";
import Task from "@models/Task";

export default function useDeleteTaskActionSheet(
	deleteTask: (task: Task) => Promise<[boolean, string]>
) {
	const [present, dismiss] = useIonActionSheet();

	const attemptDeleteTask = async (
		task: Task,
		onFinish?: (deleted: boolean) => void
	) => {
		const [success, error] = await deleteTask(task);
		if (error) console.log(error);
		onFinish && onFinish(success);
		return true;
	};

	const presentDeleteListActionSheet = (
		task: Task,
		onFinish?: (deleted: boolean) => void
	) => {
		present({
			//onDidDismiss: (e) => {onDismiss && onDismiss()},
			header: "All data will be lost.",
			buttons: [
				{
					text: "Delete Task",
					role: "destructive",
					handler: () => {
						return attemptDeleteTask(task, onFinish);
					},
				},
				{
					text: "Cancel",
					role: "cancel",
					handler: () => {
						onFinish && onFinish(false);
					},
				},
			],
		});
	};

	return presentDeleteListActionSheet;
}
