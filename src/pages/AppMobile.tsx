import { isPlatform } from "@ionic/core";
import {
	IonApp,
	IonPage,
	IonRouterOutlet,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import { useAuthContext } from "@backend/Auth";
import { ProvideEvents, ProvideTasks } from "@backend/Database";

import NavMenu from "@components/nav/NavMenu";
import LoadingOverlay from "@components/LoadingOverlay";

import LoginPage from "@pages/mobile/LoginPage";
import SignupPage from "@pages/mobile/SignupPage";
import ForgotPasswordPage from "@pages/mobile/ForgotPasswordPage";

import TaskListsPage from "@pages/mobile/TaskListsPage";
import TasksPage from "@pages/mobile/TasksPage";
import TaskDetailsPage from "@pages/mobile/TaskDetailsPage";
import SchedulePage from "@pages/mobile/SchedulePage";
import WelcomePage from "@pages/mobile/WelcomePage";
import ComingSoonPage from "@pages/shared/ComingSoonPage";
import ProfilePage from "@pages/mobile/ProfilePage";
import Debug from "@components/debug/Debug";
import { PageSlideTransition } from "@utils/Animations";
import ErrorPage from "./shared/ErrorPage";

setupIonicReact({
	swipeBackEnabled: isPlatform("capacitor"),
});

export default function AppMobile() {
	const authContext = useAuthContext();

	return (
		<IonApp style={{ background: "white" }}>
			<IonReactRouter>
				<Debug />
				{authContext.error ? (
					<ErrorPage message="Auth/Profile Data" />
				) : authContext.loading ? (
					<LoadingOverlay />
				) : !authContext.user ? (
					<>
						<IonRouterOutlet
							id="main-content"
							animation={PageSlideTransition}
						>
							<Route exact path="/login">
								<IonPage>
									<LoginPage />
								</IonPage>
							</Route>
							<Route exact path="/signup">
								<IonPage>
									<SignupPage />
								</IonPage>
							</Route>

							<Route exact path="/forgot-password">
								<IonPage>
									<ForgotPasswordPage />
								</IonPage>
							</Route>
							<Redirect to={"/login"} />
						</IonRouterOutlet>
					</>
				) : (
					<>
						<ProvideTasks>
							<ProvideEvents user={authContext.user}>
								<NavMenu />

								<IonRouterOutlet id="main-content">
									<Route path="/profile">
										<IonPage>
											<ProfilePage />
										</IonPage>
									</Route>

									<Route path="/help">
										<IonPage>
											<WelcomePage />
										</IonPage>
									</Route>

									<Route exact path="/tasks">
										<IonPage>
											<TaskListsPage />
										</IonPage>
									</Route>
									<Route exact path="/tasks/:listID">
										<IonPage>
											<TasksPage />
										</IonPage>
									</Route>
									<Route exact path="/tasks/:listID/:taskID">
										<IonPage>
											<TaskDetailsPage />
										</IonPage>
									</Route>

									<Route path="/goals">
										<IonPage>
											<ComingSoonPage />
										</IonPage>
									</Route>

									<Route path="/routines">
										<IonPage>
											<WelcomePage />
										</IonPage>
									</Route>

									<Route path="/schedule">
										<IonPage>
											<SchedulePage />
										</IonPage>
									</Route>

									<Redirect to={"/tasks"} />
								</IonRouterOutlet>
							</ProvideEvents>
						</ProvideTasks>
					</>
				)}
			</IonReactRouter>
		</IonApp>
	);
}
