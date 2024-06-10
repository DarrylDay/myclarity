import BackArrow from "@components/nav/BackArrow";
import { isPlatform } from "@ionic/core";
import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";

type Props = {
	children: any;
	backButton?: boolean;
	backURL?: string;
	iosStatusBarStyle?: Style;
};

export default function MobilePage(props: Props) {
	useEffect(() => {
		if (isPlatform("ios") && isPlatform("capacitor")) {
			StatusBar.setStyle({
				style: props.iosStatusBarStyle
					? props.iosStatusBarStyle
					: Style.Default,
			});
		}
	}, [props.iosStatusBarStyle]);

	return (
		<IonContent forceOverscroll={false}>
			<div
				style={{
					paddingTop: isPlatform("capacitor")
						? "var(--ion-safe-area-top)"
						: undefined,
					paddingBottom: isPlatform("capacitor")
						? "var(--ion-safe-area-bottom)"
						: undefined,
					paddingLeft: isPlatform("capacitor")
						? "var(--ion-safe-area-left)"
						: undefined,
					paddingRight: isPlatform("capacitor")
						? "var(--ion-safe-area-right)"
						: undefined,
				}}
				className="h-full flex flex-col flex-nowrap items-center sm:justify-center sm:bg-gray-100"
			>
				<div className="max-w-lg w-full flex flex-col flex-nowrap items-stretch p-6 flex-grow sm:flex-grow-0 sm:shadow-xl sm:rounded-lg sm:bg-white">
					{/* TODO: Make sure prev URL is on this domain*/}
					{props.backButton && (
						<BackArrow
							url={props.backURL ? props.backURL : "/login"}
						/>
					)}
					{props.children}
				</div>
			</div>
		</IonContent>
	);
}
