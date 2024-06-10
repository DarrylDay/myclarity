import {
	IonButton,
	IonCheckbox,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonText,
	useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { mail, lockClosed, arrowBackOutline } from "ionicons/icons";

import EmailValidator from "email-validator";
import { signUpWithEmailAndPassword } from "@backend/Auth";
import { Link, useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { isPlatform } from "@ionic/core";

export default function SignupForm() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [terms, setTerms] = useState(false);
	const [error, setError] = useState<string>();

	const [presentToast, dismiss] = useIonToast();

	const handleSignUpWithEmailAndPassword = async () => {
		setError(undefined);

		if (!EmailValidator.validate(email)) {
			setTimeout(() => {
				setError("Invalid email address.");
			}, 200);
		} else if (password === "") {
			setTimeout(() => {
				setError("Password is empty.");
			}, 200);
		} else if (password.indexOf(" ") >= 0) {
			setTimeout(() => {
				setError("Password must not contain whitespace.");
			}, 200);
		} else if (password.length < 8) {
			setTimeout(() => {
				setError("Password must be greater than 7 characters.");
			}, 200);
		} else if (password !== confirmPassword) {
			setTimeout(() => {
				setError("Passwords do not match.");
			}, 200);
		} else if (!terms) {
			setTimeout(() => {
				setError("Must accept privacy policy.");
			}, 200);
		} else {
			setError(undefined);
			signUpWithEmailAndPassword(email, password)
				.then(() => {
					if (!isPlatform("desktop")) window.location.reload();
				})
				.catch((e) => {
					if (e.code == "auth/email-already-in-use") {
						setTimeout(() => {
							setError("Email already in use.");
						}, 200);
					} else if (e.code == "auth/invalid-email") {
						setTimeout(() => {
							setError("Invalid email address.");
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
		}
	};

	function reset() {
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setTerms(false);
		setError(undefined);
	}

	return (
		<div
			style={{
				//flexGrow: 4,
				display: "flex",
				flexFlow: "column nowrap",
				justifyContent: "center",
			}}
		>
			<IonText color="dark">
				<h3 className="text-xl font-medium">Create your Account</h3>
			</IonText>

			{error && (
				<IonText color="danger">
					<p>{error}</p>
				</IonText>
			)}

			<IonItem className="my-4 login-input">
				<IonIcon color="primary" slot="start" icon={mail} />
				<IonInput
					type="email"
					placeholder="Email"
					value={email}
					onIonChange={(e) => setEmail(e.detail.value!)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleSignUpWithEmailAndPassword();
						}
					}}
				/>
			</IonItem>

			<IonItem className="mb-4 login-input">
				<IonIcon color="primary" slot="start" icon={lockClosed} />
				<IonInput
					type="password"
					placeholder="Password"
					value={password}
					onIonChange={(e) => setPassword(e.detail.value!)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleSignUpWithEmailAndPassword();
						}
					}}
				/>
			</IonItem>

			<IonItem className="mb-4 login-input">
				<IonIcon color="primary" slot="start" icon={lockClosed} />
				<IonInput
					type="password"
					placeholder="Confirm password"
					value={confirmPassword}
					onIonChange={(e) => setConfirmPassword(e.detail.value!)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleSignUpWithEmailAndPassword();
						}
					}}
				/>
			</IonItem>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					margin: "5px 0px 5px 0px",
				}}
			>
				<IonCheckbox
					id="privacy-policy-checkbox"
					slot="start"
					checked={terms}
					onIonChange={(e) => {
						setTerms(!terms);
					}}
				/>
				<IonLabel
					style={{
						paddingLeft: "10px",
					}}
					className="text-wrap"
				>
					<p>
						<span onClick={(e) => setTerms(!terms)}>Agree to </span>
						<span>
							<a
								href="https://myclarity.io/privacy.html"
								target="_blank"
								rel="noreferrer noopener"
							>
								Privacy Policy
							</a>
						</span>
					</p>
				</IonLabel>
			</div>

			<IonButton
				className="my-4"
				color="primary"
				expand="block"
				onClick={(e) => {
					handleSignUpWithEmailAndPassword();
				}}
			>
				Sign up
			</IonButton>

			<IonText
				className="text-center mb-6"
				color="medium"
				hidden={isMobile}
			>
				<p>
					Already have an account? {""}
					<span>
						<Link
							onClick={(e) => {
								reset();
							}}
							to={{
								pathname: "/login",
								state: { prevPath: history.location.pathname },
							}}
							style={{ textDecoration: "none" }}
						>
							<IonText color="primary">Login</IonText>
						</Link>
					</span>
				</p>
			</IonText>
		</div>
	);
}
