import { IonButton } from "@ionic/react";

type Props = {
	imgSrc?: string;
	iconHeight?: string;
	onClick?: React.MouseEventHandler<HTMLIonButtonElement> | undefined;
	id?: string;
};

export default function ProviderButton(props: Props) {
	return (
		<>
			<IonButton
				className="w-20"
				onClick={props.onClick}
				color="light"
				expand="block"
				id={props.id}
			>
				<img
					className="object-scale-down w-full"
					style={{
						height: props.iconHeight ? props.iconHeight : "24px",
					}}
					src={props.imgSrc}
				/>
			</IonButton>
		</>
	);
}
