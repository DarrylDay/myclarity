import { useIonAlert } from "@ionic/react";
import Task from "@models/Task";

export default function useDeleteTaskAlert(
	deleteTask: (data: Task) => Promise<[boolean, string]>
) {
	const [presentAlert] = useIonAlert();

	const attemptDeleteTask = async (
		task: Task,
		onFinish?: (deleted: boolean) => void
	) => {
		const [success, error] = await deleteTask(task);
		if (error) console.log(error);
		onFinish && onFinish(success);
		return true;
	};

	const presentDeleteTaskAlert = (
		task: Task,
		onFinish?: (deleted: boolean) => void
	) => {
		presentAlert({
			id: "alert-delete-task",
			header: "Delete Task",
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
					handler: () => {
						onFinish && onFinish(false);
					},
				},
				{
					text: "Delete",
					role: "destructive",
					handler: (value: any) => {
						return attemptDeleteTask(task, onFinish);
					},
				},
			],
			backdropDismiss: false,
		});
	};

	return presentDeleteTaskAlert;
}
