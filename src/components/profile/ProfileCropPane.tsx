import { useAuthContext } from "@backend/Auth";
import { uploadProfilePicture } from "@backend/Storage";
import { useNotifictions } from "@components/NotificationManager";
import {
	IonButton,
	IonButtons,
	IonHeader,
	IonIcon,
	IonTitle,
	IonToolbar,
	useIonLoading,
} from "@ionic/react";
import { getCroppedImg } from "@utils/HelperFunctions";
import { closeOutline, checkmarkOutline } from "ionicons/icons";
import { useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

type Props = {
	imgCropSrc?: string | ArrayBuffer | null;
	setImgCropSrc: (imgCropSrc: string | ArrayBuffer | null) => void;
};

const crop: Crop = {
	unit: "px",
	aspect: 0,
	width: 0,
	height: 0,
	x: 0,
	y: 0,
};

function getStartCrop(width: number, height: number): Partial<Crop> {
	const ratio = width / height;
	const crop: Partial<Crop> = {
		unit: "%",
		aspect: 1,
		width: 80,
		height: 80,
		x: 10,
		y: 10,
	};

	if (width > height) {
		crop.width = undefined;
		crop.x = ((width - height * 0.8) / 2 / width) * 100;
	} else if (height > width) {
		crop.height = undefined;
		crop.y = ((height - width * 0.8) / 2 / height) * 100;
	}

	console.log(crop);

	return crop;
}

export default function ProfileCropPane(props: Props) {
	const authContext = useAuthContext();
	const [imgCrop, setImgCrop] = useState<Partial<Crop>>({});
	const [profileImg, setProfileImg] = useState<HTMLImageElement>();
	const [createNotification] = useNotifictions();
	const [present, dismiss] = useIonLoading();

	function onError(message: string, error: any) {
		console.log(error);
		createNotification("Error", message);
		props.setImgCropSrc(null);
		dismiss();
	}

	return (
		<>
			<IonHeader>
				<IonToolbar color={"primary"}>
					<IonButtons slot="start">
						<IonButton
							onClick={(e) => {
								props.setImgCropSrc(null);
								setImgCrop({});
							}}
						>
							<IonIcon icon={closeOutline} size={"large"} />
						</IonButton>
					</IonButtons>

					<IonTitle>Edit Picture</IonTitle>

					<IonButtons slot="end">
						<IonButton
							onClick={(e) => {
								if (profileImg) {
									present("Please wait...");

									getCroppedImg(
										profileImg,
										Object.assign(crop, imgCrop),
										"profile.jpeg"
									)
										.then((imgURL) => {
											setImgCrop({});
											uploadProfilePicture(
												authContext,
												imgURL as any
											)
												.then(() => {
													// createNotification(
													// 	"Success",
													// 	"Profile Picture Updated"
													// );
													// props.setImgCropSrc(
													// 	null
													// );
													// dismiss();
													window.location.reload();
												})
												.catch((e) => {
													onError(
														"Error Uploading Profile Picture",
														e
													);
												});
										})
										.catch((e) => {
											onError(
												"Error Cropping Profile Picture",
												e
											);
										});
								}
							}}
						>
							<IonIcon icon={checkmarkOutline} size={"large"} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<div
				style={{
					height: "95%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ReactCrop
					src={props.imgCropSrc as any}
					crop={imgCrop}
					onChange={(newCrop) => {
						setImgCrop(newCrop);
					}}
					onImageLoaded={(image) => {
						setImgCrop(getStartCrop(image.width, image.height));
						setProfileImg(image);
						return false;
					}}
					keepSelection
					circularCrop
					minWidth={128}
					minHeight={128}
					maxWidth={1500}
					//scale={1}
				/>
			</div>
		</>
	);
}
