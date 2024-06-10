import { useAuthContext } from "@backend/Auth";
import { IonButton, IonContent, IonPage } from "@ionic/react";

type Props = {
	message?: string;
};

export default function ErrorPage(props: Props) {
	const authContext = useAuthContext();

	return (
		<>
			<IonPage>
				<IonContent>
					<h1>ERROR: {props.message ? props.message : "Unknown"}</h1>
					<p>Please contact support at darryl@myclarity.io</p>
					{authContext.user && (
						<IonButton
							onClick={(e) => {
								authContext.signOut().then(() => {
									window.location.reload();
								});
							}}
						>
							Sign Out
						</IonButton>
					)}
				</IonContent>
			</IonPage>
		</>
	);
}
