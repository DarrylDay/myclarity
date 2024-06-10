import { useIonAlert } from "@ionic/react";
import TaskList from "@models/TaskList";

export default function useRenameTaskListAlert(
	updateList: (data: TaskList) => Promise<[boolean, string]>
) {
	const [presentAlert] = useIonAlert();

	const onUpdateList = async (taskList: TaskList) => {
		const [success, error] = await updateList(taskList);
		console.log(success);
		if (error) console.log(error);
		return success;
	};

	const presentNewTaskListAlert = (taskList: TaskList) => {
		presentAlert({
			header: "Rename List",
			inputs: [
				{
					type: "text",
					name: "NewListName",
					label: "List Name",
					placeholder: "List Name",
					value: taskList.name,
				},
			],
			buttons: [
				{
					text: "Cancel",
				},
				{
					text: "Rename",
					handler: (value: any) => {
						const trimmedName = value.NewListName.trim();

						if (trimmedName.length > 0) {
							taskList.name = trimmedName;
							onUpdateList(taskList);
							return true;
						}

						return false;
					},
				},
			],
			backdropDismiss: false,
		});
	};

	return presentNewTaskListAlert;
}
