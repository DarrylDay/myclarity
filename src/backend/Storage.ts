import firebase from "firebase/app";
import { storage } from  "@generated/Config";

import { useEffect, useState } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";

import UserProfile from "@models/UserProfile";
import { AuthContext, validateAuthContext } from "./Auth";

function profileStorageRef(user: firebase.User) {
    return storage.ref('users/' + user.uid + "/profile");
} 

export async function uploadProfilePicture(authContext: AuthContext, file:File) {
    const context = validateAuthContext(authContext);
    await profileStorageRef(context.user).put(file);
    await context.updateProfile({imageUploaded: true});
}

export async function uploadProfilePictureBase64(authContext: AuthContext, base64:string) {
    const context = validateAuthContext(authContext);
    await profileStorageRef(context.user).putString(base64, 'data_url');
    await context.updateProfile({imageUploaded: true});
}

export async function deleteProfilePicture(authContext: AuthContext) {
    const context = validateAuthContext(authContext);
    await profileStorageRef(context.user).delete();
    await context.updateProfile({imageUploaded: false});
}

export function useProfilePicture(user:firebase.User | null | undefined, profileData?: UserProfile) : 
    [Blob | undefined, boolean, Error | undefined] {

    const loaded = (user && profileData);
    const imgUploaded = (loaded && profileData.imageUploaded);

    const [profileRef, setProfileRef] = useState(imgUploaded ? profileStorageRef(user) : undefined)
    const [storageURL, loading, error] = useDownloadURL(profileRef)
    const [url, setURL] = useState<string | undefined>((!imgUploaded && loaded) ? profileData.avatarURL : undefined);
    const [profileBlob, setProfileBlob] = useState<Blob>();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setProfileRef(imgUploaded ? profileStorageRef(user) : undefined);
        setURL((!imgUploaded && loaded) ? profileData.avatarURL : undefined);
    }, [user, profileData])

    useEffect(() => {
        if (profileRef && !loading && !error) {
            setURL(storageURL);
        }

    }, [profileRef, loading, error])

    useEffect(() => {
        if (url) {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
              const blob = xhr.response;
              //console.log(blob);
              setProfileBlob(blob);
            };
            xhr.open('GET', url);
            xhr.send();
        }
    }, [url, refresh])

    return [profileBlob, loading, error]
}