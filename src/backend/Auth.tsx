import firebase from "firebase/app";
import { auth } from "@generated/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { cfaSignIn, cfaSignOut } from "capacitor-firebase-auth";
import UserProfile from "@models/UserProfile";
import { useUserProfile } from "./Database";
import { useProfilePicture } from "./Storage";
import { isPlatform } from "@ionic/react";

let signInMethod: "web" | "capactior" = "web";

export type AuthContext = {
	user: firebase.User | null | undefined;
	profileData: Readonly<UserProfile> | undefined;
	profileImageURL: string | undefined;
	updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
	signOut: () => Promise<void>;
	loading: boolean;
	error: any;
};

export type ValidAuthContext = AuthContext & {
	user: firebase.User;
	profileData: UserProfile;
};

export function validateAuthContext(
	authContext: AuthContext
): ValidAuthContext {
	if (!authContext.user) throw "User null";
	if (!authContext.profileData) throw "User profile data null";
	return authContext as ValidAuthContext;
}

const signOut = () => {
	if (
		isPlatform("capacitor") &&
		isPlatform("mobile") &&
		signInMethod == "capactior"
	) {
		return cfaSignOut().toPromise();
	} else {
		return auth.signOut();
	}
};

const authContext = createContext<AuthContext>({
	user: undefined,
	profileData: undefined,
	profileImageURL: undefined,
	updateProfile: async () => {},
	signOut: signOut,
	loading: true,
	error: undefined,
});

export function useAuthContext() {
	return useContext(authContext);
}

export function signInWithGoogle() {
	const provider = new firebase.auth.GoogleAuthProvider();
	return auth.signInWithRedirect(provider);
}

export function signInWithGooglePopup() {
	const provider = new firebase.auth.GoogleAuthProvider();
	return auth.signInWithPopup(provider);
}

export const loginWithGoolge = async () => {
	if (isPlatform("capacitor") && isPlatform("mobile")) {
		try {
			signInMethod = "capactior";
			await cfaSignIn("google.com").toPromise();
		} catch (e: any) {
			console.log(e);
		}
	} else {
		signInMethod = "web";
		await signInWithGoogle();
		window.location.reload();
	}
};

export function signInWithEmailAndPassword(email: string, password: string) {
	return auth.signInWithEmailAndPassword(email, password);
}

export async function signUpWithEmailAndPassword(
	email: string,
	password: string
) {
	try {
		await auth.createUserWithEmailAndPassword(email, password);
	} catch (e) {
		throw e;
	}
}

export function resetPassword(email: string) {
	return auth.sendPasswordResetEmail(email);
}

export function confirmPasswordReset(code: string, newPassword: string) {
	return auth.confirmPasswordReset(code, newPassword);
}

export function deleteCurrentUser() {
	return auth.currentUser?.delete().catch((e) => {
		console.log(e);
	});
}

export function ProvideAuth({ children }: any) {
	const [user, authLoading, authError] = useAuthState(auth);
	const [profileData, updateProfile, profileLoading, profileError] =
		useUserProfile(user);
	const [profileBlob, pictureLoading, pictureError] = useProfilePicture(
		user,
		profileData
	);
	const [profileURL, setProfileURL] = useState<string>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>();

	useEffect(() => {
		if (authError) setError(authError);
		else if (profileError) setError(profileError);
		else if (pictureError) setError(pictureError);
	}, [authError, profileError, pictureError]);

	useEffect(() => {
		if (!authLoading && !user) {
			setLoading(false);
		} else {
			setLoading(
				(authLoading ||
					profileLoading ||
					!profileData ||
					pictureLoading) as boolean
			);
		}
	}, [authLoading, profileLoading, profileData, pictureLoading]);

	useEffect(() => {
		if (profileBlob) {
			setProfileURL(URL.createObjectURL(profileBlob));
		}
	}, [profileBlob]);

	return (
		<authContext.Provider
			value={{
				user: user ? user : undefined,
				profileData: profileData,
				profileImageURL: profileURL,
				updateProfile: updateProfile,
				signOut: signOut,
				loading: loading,
				error: error,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
