import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";

type Props = {
	url?: string;
};

export default function BackArrow(props: Props) {
	const history = useHistory();

	return (
		<div>
			<IonIcon
				className="hover:cursor-pointer"
				onClick={(e) => {
					console.log(history);

					const url = history.location.state
						? (history.location.state as any).prevPath != undefined
							? undefined
							: props.url
						: props.url;

					console.log(url);

					if (url) {
						history.push(url);
					} else {
						history.goBack();
					}
				}}
				color="primary"
				icon={arrowBackOutline}
				size="large"
			/>
		</div>
	);
}
