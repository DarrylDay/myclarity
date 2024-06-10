/* React & Ionic */
import React from "react";
import ReactDOM from "react-dom";

/* Providers */
import { ProvideAuth } from "@backend/Auth";
import { ProvideNotification } from "@components/NotificationManager";

/* PWA */
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

/* Generated */
import App from "./generated/App";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

// Tailwind, ionic config, custom
import "./theme/variables.css";

ReactDOM.render(
	<React.StrictMode>
		<ProvideAuth>
			<ProvideNotification>
				<App />
			</ProvideNotification>
		</ProvideAuth>
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
