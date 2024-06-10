import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

// Tailwind, ionic config, custom
import "@/theme/variables.css";

type Props = {
	children: any;
	path?: string;
	exact?: boolean;
};

setupIonicReact({
	rippleEffect: false,
});

export default function PageDecorator(props: Props) {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet id="main-content">
					<Route path={props.path} exact={props.exact}>
						{props.children}
					</Route>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
}
