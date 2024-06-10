import { ActionSheetButton, useIonActionSheet } from "@ionic/react";

export default function useEditPictureActionSheet(
    uploadImage: () => void,
    regenImage: () => void,
    deleteImage: () => void
) {
    const [present, dismiss] = useIonActionSheet();

    const presentEditPictureActionSheet = (imgUploaded: boolean = false) => {
        const buttons: (string | ActionSheetButton)[] = [
            {
                text: imgUploaded ? "Upload New Image" : "Upload Image",
                handler: () => {
                    uploadImage();
                },
            },
        ];

        if (imgUploaded) {
            buttons.push({
                text: "Remove Image",
                role: "destructive",
                handler: () => {
                    deleteImage();
                },
            });
        }

        if (!imgUploaded) {
            buttons.push({
                text: "Randomize Avatar",
                handler: () => {
                    regenImage();
                },
            });
        }

        buttons.push({
            text: "Cancel",
            role: "cancel",
            handler: () => {},
        });

        present({
            //onDidDismiss: (e) => {onDismiss && onDismiss()},
            header: "Edit Profile Picture",
            buttons: buttons,
        });
    };

    return presentEditPictureActionSheet;
}
