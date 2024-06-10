import {
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonPopover,
} from "@ionic/react";
import { PageFadeTransition } from "@utils/Animations";

//import "./TaskPopover.css";

type Props = {
    state: {
        showPopover: boolean;
        event: any;
    };
    setState: (state: { showPopover: boolean; event: any }) => void;
};

export default function TaskPopover(props: Props) {
    return (
        <IonPopover
            isOpen={props.state.showPopover}
            event={props.state.event}
            onWillDismiss={() =>
                props.setState({ showPopover: false, event: undefined })
            }
            showBackdrop={false}
        >
            <IonList>
                <IonListHeader>
                    <h4>{"Options"}</h4>
                </IonListHeader>

                <IonItem
                    button
                    onClick={(e) => {
                        props.setState({
                            showPopover: false,
                            event: undefined,
                        });
                    }}
                >
                    Delete
                </IonItem>

                {/* <IonItem button onClick={() => {props.onSignOut();}} lines={"none"}>Logout</IonItem> */}
            </IonList>
        </IonPopover>
    );
}
