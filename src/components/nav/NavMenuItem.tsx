import { useLocation } from "react-router";
import { IonItem, IonIcon, IonLabel } from "@ionic/react";
import { PageFadeTransition, PageSlideTransition } from "@utils/Animations";

import "./NavMenuItem.css";

type Props = {
    name: string;
    icon: string | undefined;
    routerLink: string;
    onClick: React.MouseEventHandler<HTMLIonItemElement> | undefined;
    disabled?: boolean;
};

export default function NavMenuItem(props: Props) {
    const location = useLocation();

    const selected = location
        ? location.pathname.includes("/" + props.name.toLowerCase())
        : false;

    return (
        <IonItem
            disabled={props.disabled}
            lines={"none"}
            button
            detail={false}
            className={selected ? "nav-menu-item-selected" : ""}
            // routerAnimation={PageSlideTransition}
            routerLink={props.routerLink}
            routerDirection={"root"}
            onClick={props.onClick}
        >
            <IonIcon
                color={selected ? "primary" : "dark"}
                slot={"start"}
                icon={props.icon}
            />
            <IonLabel color={selected ? "primary" : "dark"}>
                {props.name}
            </IonLabel>
        </IonItem>
    );
}
