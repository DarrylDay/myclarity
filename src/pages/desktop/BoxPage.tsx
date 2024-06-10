import Logo from "@components/Logo";
import { IonContent } from "@ionic/react";

type Props = {
	children: any;
	url?: string;
};

export default function BoxPage(props: Props) {
	return (
		<IonContent forceOverscroll={false}>
			<div className="min-h-full flex items-center justify-center bg-gray-100">
				<div className="max-w-md w-full p-8 space-y-8 shadow-xl rounded-2xl bg-white">
					<Logo url={props.url ? props.url : "/login"} />
					{props.children}
				</div>
			</div>
		</IonContent>
	);
}
