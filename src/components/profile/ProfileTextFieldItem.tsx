import { IonInput, IonItem, IonLabel, isPlatform } from "@ionic/react";
import { InputChangeEventDetail } from "@ionic/core";
import { useState } from "react";

interface Props {
    label?: string | null;
    value?: string | null;
    setValue?: (value: string) => void;
    placeholder?: string;
    readonly?: boolean;
    first?: boolean;
    onChange?: (text: string) => void;
}

export default function ProfileTextFieldItem(props: Props) {
    return (
        <IonItem
            lines="inset"
            key={props.label}
            style={{
                paddingTop: props.first ? "0px" : "16px",
            }}
        >
            <IonLabel position="stacked" color="primary">
                <h1>
                    <b>{props.label}</b>
                </h1>
            </IonLabel>

            <IonInput
                color={props.readonly ? "medium" : undefined}
                readonly={props.readonly}
                placeholder={props.placeholder}
                value={props.value}
                onIonChange={(e) => {
                    if (props.setValue && e.detail.value) {
                        props.setValue(e.detail.value);

                        if (props.value !== e.detail.value && props.onChange) {
                            props.onChange(e.detail.value);
                        }
                    }
                }}
            />
        </IonItem>
    );
}
