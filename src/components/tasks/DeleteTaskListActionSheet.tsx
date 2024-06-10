import { useIonActionSheet } from "@ionic/react";
import TaskList from "@models/TaskList";

export default function useDeleteTaskActionSheet(
	deleteList: (taskList: TaskList) => Promise<[boolean, string]>
) {
	const [present, dismiss] = useIonActionSheet();

	const attemptDeleteList = async (
		taskList: TaskList,
		onFinish?: (deleted: boolean) => void
	) => {
		const [success, error] = await deleteList(taskList);
		if (error) console.log(error);
		onFinish && onFinish(success);
		return true;
	};

	const presentDeleteListActionSheet = (
		taskList: TaskList,
		onFinish?: (deleted: boolean) => void
	) => {
		present({
			//onDidDismiss: (e) => {onDismiss && onDismiss()},
			header: 'Delete "' + taskList.name + '"? All data will be lost.',
			buttons: [
				{
					text: "Delete List",
					role: "destructive",
					handler: () => {
						return attemptDeleteList(taskList, onFinish);
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
