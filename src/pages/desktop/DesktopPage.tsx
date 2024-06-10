import Logo from "@components/Logo";
import { IonContent } from "@ionic/react";

type Props = {
	children: any;
};

export default function DesktopPage(props: Props) {
	return (
		<IonContent forceOverscroll={false}>
			<div className="min-h-full flex items-start justify-center bg-gray-100">
				<div className="max-w-md w-full mt-6 p-8 space-y-8 shadow-xl rounded-2xl bg-white">
					{props.children}
				</div>
			</div>
		</IonContent>
	);
}
