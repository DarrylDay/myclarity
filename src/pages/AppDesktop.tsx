import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect } from "react-router";
import { ProvideTasks } from "@backend/Database";

import NavMenu from "@components/nav/NavMenu";

import LoginPage from "./desktop/LoginPage";
import SignupPage from "./desktop/SignupPage";
import ForgotPasswordPage from "./desktop/ForgotPasswordPage";

import TasksPage from "./desktop/TasksPage";
//import SchedulePage from './pages/desktop/ScehdulePage';
import ComingSoonPage from "./shared/ComingSoonPage";
import SchedulePage from "./mobile/SchedulePage";
import ProfilePage from "./desktop/ProfilePage";
import AuthRoute from "./shared/AuthRoute";
import NoAuthRoute from "./shared/NoAuthRoute";

setupIonicReact({
	rippleEffect: false,
});

export default function AppDesktop() {
	return (
		<>
			<IonApp>
				<IonReactRouter>
					<NavMenu />
					<IonRouterOutlet id="main-content">
						<ProvideTasks>
							<AuthRoute path="/profile">
								<ProfilePage />
							</AuthRoute>

							<AuthRoute path="/tasks">
								<TasksPage />
							</AuthRoute>

							<AuthRoute path="/goals">
								<ComingSoonPage />
							</AuthRoute>
							<AuthRoute path="/routines">
								<ComingSoonPage />
							</AuthRoute>
							<AuthRoute path="/schedule">
								<SchedulePage />
							</AuthRoute>
						</ProvideTasks>

						<NoAuthRoute exact path="/login">
							<LoginPage />
						</NoAuthRoute>
						<NoAuthRoute exact path="/signup">
							<SignupPage />
						</NoAuthRoute>
						<NoAuthRoute exact path="/forgot-password">
							<ForgotPasswordPage />
						</NoAuthRoute>

						<Redirect exact path="/" to="/login" />
					</IonRouterOutlet>
				</IonReactRouter>
			</IonApp>
		</>
	);
}
