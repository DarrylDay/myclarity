import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp( {
    apiKey: "",
    authDomain: "clarity-prod-.firebaseapp.com",
    projectId: "clarity-prod-",
    storageBucket: "clarity-prod-.appspot.com",
    messagingSenderId: "",
    appId: ""
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();