import { formatDate } from "@fullcalendar/react";
import {
	IonButton,
	IonContent,
	IonDatetime,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonModal,
	IonPage,
	IonPopover,
	isPlatform,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import { useState } from "react";

interface Props {
	label?: string | null;
	value?: string | null;
	setValue?: (value: string) => void;
	displayFormat?: string;
	min?: string;
	max?: string;
	first?: boolean;
	onChange?: (text: string) => void;
}

export default function ProfileDatePickerItem(props: Props) {
	return (
		<IonItem
			lines="inset"
			key={props.label}
			style={{
				paddingTop: props.first ? "0px" : "16px",
			}}
		>
			<IonLabel position="stacked" color="primary">
				<h1>
					<b>{props.label}</b>
				</h1>
			</IonLabel>

			<IonInput
				readonly
				value={props.value ? formatDate(props.value!) : "Not Set"}
			/>

			<IonButton
				className="mt-8"
				style={{ marginTop: isPlatform("desktop") ? "36px" : "52px" }}
				slot="end"
				fill="clear"
				id={isPlatform("desktop") ? "open-popover" : "open-modal"}
			>
				<IonIcon icon={calendar} />
			</IonButton>

			<IonModal
				style={{
					"--width": "290px",
					"--height": "350px",
					"--border-radius": "8px",
				}}
				className="modal-default"
				trigger="open-modal"
				showBackdrop={true}
			>
				<IonContent forceOverscroll={false}>
					<IonDatetime
						presentation="date"
						value={props.value}
						onIonChange={(e) => {
							if (props.setValue && e.detail.value) {
								//props.setValue(formatDate(e.detail.value!));
								props.setValue(e.detail.value);

								if (
									props.value !== e.detail.value &&
									props.onChange
								) {
									props.onChange(e.detail.value);
								}
							}
						}}
					/>
				</IonContent>
			</IonModal>

			<IonPopover trigger="open-popover" showBackdrop={false}>
				<IonDatetime
					value={props.value}
					presentation="date"
					onIonChange={(e) => {
						if (props.setValue && e.detail.value) {
							//props.setValue(formatDate(e.detail.value!));
							props.setValue(e.detail.value);

							if (
								props.value !== e.detail.value &&
								props.onChange
							) {
								props.onChange(e.detail.value);
							}
						}
					}}
				/>
			</IonPopover>

			{/* <IonDatetime
				// displayFormat={
				// 	props.displayFormat ? props.displayFormat : "MM/DD/YYYY"
				// }
				presentation="date"
				min={props.min ? props.displayFormat : "1900-01-01"}
				max={props.max ? props.displayFormat : "2002-01-01"}
				value={props.value}
				onIonChange={(e) => {
					if (
						props.setValue &&
						e.detail.value &&
						props.value != undefined
					) {
						props.setValue(e.detail.value);

						if (props.value !== e.detail.value && props.onChange) {
							props.onChange(e.detail.value);
						}
					}
				}}
			></IonDatetime> */}
		</IonItem>
	);
}
