import { signInWithEmailAndPassword } from "@backend/Auth";
import {
	IonButton,
	IonIcon,
	IonInput,
	IonItem,
	IonRouterLink,
	IonText,
	useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { mail, lockClosed } from "ionicons/icons";

export default function EmailAndPasswordLogin() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>();

	const handleSignInWithEmailAndPassword = async () => {
		setError(undefined);

		signInWithEmailAndPassword(email, password)
			.then(() => {
				window.location.reload();
			})
			.catch((e) => {
				if (
					e.code == "auth/invalid-email" ||
					e.code == "auth/wrong-password" ||
					e.code == "auth/user-not-found"
				) {
					setTimeout(() => {
						setError("Incorrect username or password.");
					}, 200);
				} else {
					console.log(e);
					setTimeout(() => {
						setError(
							"Unknown error. Try again later or contact support."
						);
					}, 200);
				}
			});
	};

	function reset() {
		setEmail("");
		setPassword("");
		setError(undefined);
	}

	return (
		<div className="flex flex-col justify-center">
			<IonText color="dark">
				<h3 className="text-xl font-medium">Login to your Account</h3>
			</IonText>

			{error && (
				<IonText color="danger">
					<p>{error}</p>
				</IonText>
			)}

			<IonItem className="my-4 login-input">
				<IonIcon color="primary" slot="start" icon={mail} />
				<IonInput
					id="login-email-input"
					type="email"
					placeholder="Email"
					value={email}
					onIonChange={(e) => setEmail(e.detail.value!)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleSignInWithEmailAndPassword();
						}
					}}
				/>
			</IonItem>

			<IonItem className="mb-4 login-input">
				<IonIcon color="primary" slot="start" icon={lockClosed} />
				<IonInput
					id="login-password-input"
					type="password"
					placeholder="Password"
					value={password}
					onIonChange={(e) => setPassword(e.detail.value!)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleSignInWithEmailAndPassword();
						}
					}}
				/>
			</IonItem>

			<p className="text-right" style={{ marginTop: "0px" }}>
				<Link
					onClick={(e) => {
						reset();
					}}
					to={{
						pathname: "/forgot-password",
						state: { prevPath: history.location.pathname },
					}}
					style={{ textDecoration: "none" }}
				>
					<IonText color="medium">Forgot password?</IonText>
				</Link>
			</p>

			<IonButton
				className="my-4"
				color="primary"
				expand="block"
				onClick={(e) => {
					handleSignInWithEmailAndPassword();
				}}
			>
				Sign in
			</IonButton>

			<IonText className="text-center" color="medium">
				<p>
					Don't have an account? {""}
					<span>
						<Link
							onClick={(e) => {
								reset();
							}}
							to={{
								pathname: "/signup",
								state: { prevPath: history.location.pathname },
							}}
							style={{ textDecoration: "none" }}
						>
							<IonText color="primary">Sign up</IonText>
						</Link>
					</span>
				</p>
			</IonText>
		</div>
	);
}
