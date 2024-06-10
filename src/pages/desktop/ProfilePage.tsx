import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "@components/page/PageHeader";

import firebase from "firebase/app";

import "./TasksPage.css";
import ProfilePane from "@components/profile/ProfilePane";
import { useState } from "react";
import ProfileCropPane from "@components/profile/ProfileCropPane";
import DesktopPage from "./DesktopPage";
import BoxPage from "./BoxPage";

export default function ProfilePage() {
	const [imgCropSrc, setImgCropSrc] = useState<string | ArrayBuffer | null>();

	return (
		<IonPage>
			<PageHeader name={"Profile"} />

			<DesktopPage>
				<ProfilePane setImgCropSrc={setImgCropSrc} />
			</DesktopPage>

			{imgCropSrc && (
				<div className="fixed z-10 min-w-full min-h-full flex items-center justify-center bg-black/50">
					<div className="max-w-lg w-full shadow-xl rounded-2xl bg-white">
						<ProfileCropPane
							imgCropSrc={imgCropSrc}
							setImgCropSrc={setImgCropSrc}
						/>
					</div>
				</div>
			)}
		</IonPage>
	);
}
