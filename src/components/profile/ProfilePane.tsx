// Core Ionic / React
import { useEffect, useRef, useState } from "react";
import { isPlatform } from "@ionic/core";
import { cameraOutline } from "ionicons/icons";
import {
	IonButton,
	IonList,
	IonAvatar,
	IonFab,
	IonFabButton,
	IonIcon,
	useIonLoading,
	useIonAlert,
} from "@ionic/react";
import { isMobile } from "react-device-detect";

// Backend
import { deleteCurrentUser, useAuthContext } from "@backend/Auth";
import {
	deleteProfilePicture,
	uploadProfilePictureBase64,
} from "@backend/Storage";

// Custom components
import ProfileTextFieldItem from "@components/profile/ProfileTextFieldItem";
import useEditPictureActionSheet from "@components/profile/EditPictureActionSheet";
import ProfileCheckboxItem from "@components/profile/ProfileCheckboxButton";
import ProfileDatePickerItem from "@components/profile/ProfileDatePickerItem";
import { useNotifictions } from "@components/NotificationManager";

// Other Packages
import {
	Camera,
	CameraOptions,
	DestinationType,
	EncodingType,
	MediaType,
} from "@ionic-native/camera";

// CSS
import "./ProfilePane.css";
import "react-image-crop/dist/ReactCrop.css";
import { getRandomAvatar } from "@utils/HelperFunctions";

type Props = {
	setImgCropSrc: (imgCropSrc: string | ArrayBuffer | null) => void;
};

export default function ProfilePane(props: Props) {
	const authContext = useAuthContext();

	const [email, setEmail] = useState<string>();
	const [firstName, setFirstName] = useState<string>();
	const [lastName, setLastName] = useState<string>();
	const [birthday, setBirthday] = useState<string>();
	const [marketing, setMarketing] = useState<boolean>();

	const [changes, setChanges] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const [createNotification] = useNotifictions();
	const [present, dismiss] = useIonLoading();

	const [presentAlert] = useIonAlert();

	const askForImgFile = () => {
		if (isMobile && isPlatform("capacitor")) {
			const cameraOptions: CameraOptions = {
				quality: 90,
				destinationType: DestinationType.DATA_URL,
				encodingType: EncodingType.JPEG,
				mediaType: MediaType.PICTURE,
				allowEdit: true,
				sourceType: 0,
				targetWidth: 1024,
				targetHeight: 1024,
			};

			Camera.getPicture(cameraOptions)
				.then((imgData: string) => {
					present("Please Wait...");
					uploadProfilePictureBase64(
						authContext,
						"data:image/jpeg;base64," + imgData
					)
						.then(() => {
							// createNotification(
							// 	"Success",
							// 	"Profile Picture Updated"
							// );
							// dismiss();
							window.location.reload();
						})
						.catch((error) => {
							console.log(error);
							createNotification(
								"Error",
								"Error Uploading Profile Picture"
							);
							dismiss();
						});
				})
				.catch((error) => {
					console.log(error);
					createNotification("Error", "Error Getting Picture");
				});
		} else {
			if (inputRef.current) {
				inputRef.current.onchange = (e) => {
					const target = e.target as HTMLInputElement;
					const files = target.files;

					if (files && files.length > 0) {
						const reader = new FileReader();
						reader.addEventListener("load", () => {
							props.setImgCropSrc(reader.result);

							// Allow same file to be uploaded again if cancel crop
							if (inputRef.current) inputRef.current.value = "";
						});
						reader.readAsDataURL(files[0]);
					}
				};

				inputRef.current.click();
			}
		}
	};

	const regenAvatar = () => {
		authContext
			.updateProfile({ avatarURL: getRandomAvatar() })
			.then(() => {
				createNotification("Info", "Avatar Updated");
			})
			.catch((error) => {
				console.log(error);
				createNotification("Error", "Error Updating Avatar");
			});
	};

	const deleteImg = () => {
		deleteProfilePicture(authContext)
			.then(() => {
				createNotification("Info", "Profile Picture Removed");
			})
			.catch((error) => {
				console.log(error);
				createNotification("Error", "Error Deleting Profile Picture");
			});
	};

	const presentEditPicture = useEditPictureActionSheet(
		askForImgFile,
		regenAvatar,
		deleteImg
	);

	useEffect(() => {
		setChanges(false);
		const data = authContext.profileData;
		if (data) {
			setEmail(data.email);
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setBirthday(data.birthday);
			setMarketing(data.marketingConsent);
			console.log(data.birthday);
		}
	}, [authContext.profileData]);

	return (
		<>
			<IonList>
				<div
					style={{
						display: "flex",
						flexFlow: "column wrap",
						alignItems: "center",
						justifyContent: "center",
						height: "200px",
					}}
				>
					<IonAvatar
						className="bg-gray-100"
						style={{
							height: "150px",
							width: "150px",
							"--border-radius": "20%",
							borderRadius: "20%",
							// overflow: "visible",
							// border: "4px solid #3f51b5",
							position: "relative",
						}}
					>
						<img src={authContext.profileImageURL} />

						<IonFab
							style={{
								position: "absolute",
								bottom: "-18px",
								right: "-18px",
							}}
						>
							<IonFabButton
								onClick={(e) => {
									presentEditPicture(
										authContext.profileData
											? authContext.profileData
													.imageUploaded
											: false
									);
								}}
								style={{ width: "40px", height: "40px" }}
							>
								<IonIcon src={cameraOutline} size="small" />
							</IonFabButton>
						</IonFab>
					</IonAvatar>
					<p
						style={{
							marginTop: "8px",
							marginBottom: "0px",
							fontSize: "12px",
						}}
					>
						<b>Joined:</b>{" "}
						{authContext.profileData
							? new Date(
									new Date(0).setMilliseconds(
										authContext.profileData.startDate
									)
							  ).toLocaleDateString()
							: "Unknown"}
					</p>
				</div>

				<ProfileTextFieldItem
					label="Email"
					value={email}
					setValue={setEmail}
					placeholder="Not Set"
					readonly
					first
					onChange={(text) => {
						setChanges(true);
					}}
				/>

				<ProfileTextFieldItem
					label="First Name"
					value={firstName}
					setValue={setFirstName}
					placeholder="Not Set"
					onChange={(text) => {
						setChanges(true);
					}}
				/>

				<ProfileTextFieldItem
					label="Last Name"
					value={lastName}
					setValue={setLastName}
					placeholder="Not Set"
					onChange={(text) => {
						setChanges(true);
					}}
				/>

				<ProfileDatePickerItem
					label="Birthday"
					value={birthday}
					setValue={setBirthday}
					onChange={(text) => {
						setChanges(true);
					}}
				/>

				<ProfileCheckboxItem
					title="Marketing Consent"
					text="I agree to recieve promotional emails"
					checked={marketing}
					setChecked={setMarketing}
					onChange={(checked) => {
						setChanges(true);
					}}
				/>

				<br />

				<IonButton
					style={{
						marginLeft: "24px",
						marginRight: "24px",
					}}
					expand="block"
					onClick={(e) => {
						setChanges(false);
						authContext
							.updateProfile({
								firstName: firstName ? firstName : "",
								lastName: lastName ? lastName : "",
								birthday: birthday ? birthday : "",
								marketingConsent: marketing ? marketing : false,
							})
							.then(() => {
								createNotification("Info", "Changes Saved");
							})
							.catch((e) => {
								setChanges(true);
								console.log(e);
								createNotification(
									"Info",
									"Error Saving Changes",
									5000
								);
							});
					}}
					disabled={!changes}
				>
					Save Changes
				</IonButton>
				<IonButton
					color="danger"
					style={{
						marginTop: "20px",
						marginLeft: "24px",
						marginRight: "24px",
					}}
					expand="block"
					onClick={(e) => {
						presentAlert({
							header: "Delete Account?",
							message:
								"Are you sure you want to delete your account? All data will be lost.",
							buttons: [
								{
									text: "Cancel",
								},
								{
									text: "Delete",
									handler: (value: any) => {
										deleteCurrentUser();
									},
								},
							],
							backdropDismiss: false,
						});
					}}
				>
					Delete Account
				</IonButton>
				<br />
				<br />
			</IonList>

			<input ref={inputRef} hidden type="file" accept=".jpeg,.jpg,.png" />
		</>
	);
}
