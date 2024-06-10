import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { CheckboxChangeEventDetail } from "@ionic/core";

interface Props {
	title?: string | null;
	text?: string | null;
	checked?: boolean;
	setChecked?: (checked: boolean) => void;
	onChange?: (checked: boolean) => void;
}

export default function ProfileCheckboxItem(props: Props) {
	return (
		<IonItem lines="none" key={props.title} style={{ paddingTop: "16px" }}>
			<IonCheckbox
				id="profile-marketing-consent"
				slot="start"
				checked={props.checked}
				onIonChange={(e) => {
					if (props.setChecked && props.checked != undefined) {
						props.setChecked(e.detail.checked);

						if (
							props.checked != e.detail.checked &&
							props.onChange
						) {
							props.onChange(e.detail.value);
						}
					}
				}}
			/>
			<IonLabel className="break-words">
				<p className="font-bold text-black">
					{props.title ? props.title : ""}
				</p>
				<p>{props.text ? props.text : ""}</p>
			</IonLabel>
		</IonItem>
	);
}
