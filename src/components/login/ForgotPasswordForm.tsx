import { resetPassword } from "@backend/Auth";
import {
	IonButton,
	IonIcon,
	IonInput,
	IonItem,
	IonText,
	isPlatform,
} from "@ionic/react";
import { useState } from "react";
import { mail } from "ionicons/icons";

import EmailValidator from "email-validator";
import { useHistory } from "react-router";

export default function ForgotpasswordForm() {
	const history = useHistory();
	const [submitted, setSubmitted] = useState(false);
	const [email, setEmail] = useState("");
	const [error, setError] = useState<string>();

	const submitPasswordResetEmail = async () => {
		setError(undefined);

		if (!EmailValidator.validate(email)) {
			setTimeout(() => {
				setError("Invalid email address.");
			}, 200);
		} else {
			setError(undefined);
			resetPassword(email)
				.then(() => {
					setSubmitted(true);
				})
				.catch((e) => {
					if (e.code == "auth/invalid-email") {
						setTimeout(() => {
							setError("Invalid email address.");
						}, 200);
					} else if (e.code == "auth/user-not-found") {
						setSubmitted(true);
					} else {
						console.log(e);
						setTimeout(() => {
							"Unknown error. Try again later or contact support.";
						}, 200);
					}
				});
		}
	};

	function reset() {
		setSubmitted(false);
		setEmail("");
		setError(undefined);
	}

	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				flexFlow: "column nowrap",
			}}
		>
			<div
				style={{
					flexGrow: 1,
					display: "flex",
					flexFlow: "column nowrap",
					justifyContent: "center",
				}}
			>
				{!submitted ? (
					<>
						<IonText color="dark">
							<h3 className="text-xl font-medium">
								Password Reset
							</h3>
						</IonText>

						<IonText color="medium">
							<p style={{ marginTop: "0px" }}>
								Enter the email associated with your account and
								we will send you instructions to reset your
								password.
							</p>
						</IonText>

						{error && (
							<IonText className="mt-2" color="danger">
								<p
									style={{
										marginTop: "0px",
										marginBottom: "0px",
									}}
								>
									{error}
								</p>
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
										submitPasswordResetEmail();
									}
								}}
							/>
						</IonItem>

						<IonButton
							className="my-4"
							color="primary"
							expand="block"
							onClick={(e) => submitPasswordResetEmail()}
						>
							Submit
						</IonButton>
					</>
				) : (
					<>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<img width="128px" src="assets/message.png" />
						</div>

						<IonText className="text-center" color="dark">
							<h3>Email Sent</h3>
						</IonText>

						<IonText className="text-center" color="medium">
							<p style={{ marginTop: "0px" }}>
								Check your inbox for password recovery
								instructions.
							</p>
						</IonText>

						<IonButton
							className="my-4"
							color="primary"
							expand="block"
							onClick={(e) => {
								//reset();
								history.goBack();
							}}
						>
							Login
						</IonButton>
					</>
				)}
			</div>

			{submitted && (
				<div
					style={{
						// flexGrow: 1,
						display: "flex",
						flexFlow: "column nowrap",
						justifyContent: "center",
					}}
				>
					<IonText className="text-center" color="medium">
						<p
							style={{
								marginBottom: isPlatform("mobileweb")
									? "30px"
									: undefined,
							}}
						>
							Didn't receive an email? Check your spam filter, or{" "}
							<span>
								<IonText
									color="primary"
									onClick={(e) => reset()}
									style={{ cursor: "pointer" }}
								>
									try another email address
								</IonText>
							</span>
						</p>
					</IonText>
				</div>
			)}
		</div>
	);
}
