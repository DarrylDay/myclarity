import { useRef } from "react";
import { isPlatform } from "@ionic/core";
import { IonMenu } from "@ionic/react";

import "./NavMenu.css";
import NavMenuContent from "./NavMenuContent";

export default function NavMenu() {
	const menuRef = useRef<HTMLIonMenuElement>(null);

	function onMenuItemClick() {
		menuRef.current?.close();
	}

	// TODO: Allow swipe if on root page and PWA
	return (
		<IonMenu
			ref={menuRef}
			side="start"
			contentId="main-content"
			swipeGesture={isPlatform("capacitor")}
		>
			<NavMenuContent onMenuItemClick={onMenuItemClick} />
		</IonMenu>
	);
}
