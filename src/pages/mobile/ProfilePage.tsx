import PageHeader from "@components/page/PageHeader";
import ProfileCropPane from "@components/profile/ProfileCropPane";
import ProfilePane from "@components/profile/ProfilePane";
import { IonContent, isPlatform } from "@ionic/react";
import { useEffect, useState } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";

export default function ProfilePage() {
	const [imgCropSrc, setImgCropSrc] = useState<string | ArrayBuffer | null>();

	useEffect(() => {
		if (isPlatform("ios") && isPlatform("capacitor")) {
			StatusBar.setStyle({
				style: Style.Dark,
			});
		}
	});

	return (
		<>
			<PageHeader />
			<IonContent forceOverscroll={false}>
				<ProfilePane setImgCropSrc={setImgCropSrc} />
			</IonContent>

			{imgCropSrc && (
				<div
					style={{
						position: "fixed",
						zIndex: 10,
						width: "100%",
						height: "100%",
						backgroundColor: "black",
					}}
				>
					<ProfileCropPane
						imgCropSrc={imgCropSrc}
						setImgCropSrc={setImgCropSrc}
					/>
				</div>
			)}
		</>
	);
}
