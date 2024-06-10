import { useIonAlert } from "@ionic/react";
import TaskList from "@models/TaskList";
import "./NewTaskListAlert.css";

export default function useNewTaskListAlert(
    createNewList: (data: TaskList) => Promise<[boolean, string]>
) {
    const [presentAlert] = useIonAlert();

    const onCreateNewList = async (name: string) => {
        const newTaskList = new TaskList(name);
        const [success, error] = await createNewList(newTaskList);
        console.log(success);
        if (error) console.log(error);
        return success;
    };

    const presentNewTaskListAlert = () => {
        presentAlert({
            header: "New Task List",
            inputs: [
                {
                    type: "text",
                    name: "NewListName",
                    label: "List Name",
                    placeholder: "List Name",
                },
            ],
            buttons: [
                {
                    text: "Cancel",
                },
                {
                    text: "Create",
                    handler: (value: any) => {
                        const trimmedName = value.NewListName.trim();

                        if (trimmedName.length > 0) {
                            onCreateNewList(trimmedName);
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
