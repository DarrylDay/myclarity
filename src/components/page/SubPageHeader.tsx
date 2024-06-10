import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonIcon,
	IonButton,
} from "@ionic/react";
import { ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import { PageSlideTransition, PageFadeTransition } from "@utils/Animations";

import "./SubPageHeader.css";

type Props = {
	title?: string;
	color?: string;
	defaultHref?: string;
	backButtonText?: string;
	pageTransition?: "slide" | "fade";
	border?: boolean;
	buttonClick?: React.MouseEventHandler<HTMLIonButtonElement>;
};

export default function SubPageHeader(props: Props) {
	return (
		<IonHeader color={props.color}>
			<IonToolbar
				color={props.color}
				className={props.border ? "" : "subpage-toolbar"}
			>
				<IonButtons slot="start">
					<IonBackButton
						defaultHref={props.defaultHref}
						text={props.backButtonText}
						routerAnimation={
							props.pageTransition &&
							props.pageTransition == "fade"
								? PageFadeTransition
								: PageSlideTransition
						}
					/>
				</IonButtons>

				<IonTitle
					color="light"
					//className={"text-center"}
				>
					{props.title}
				</IonTitle>

				<IonButtons
					slot="end"
					hidden={props.buttonClick ? false : true}
				>
					<IonButton onClick={props.buttonClick}>
						<IonIcon
							slot="icon-only"
							ios={ellipsisHorizontal}
							md={ellipsisVertical}
						/>
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
}
