import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp( {
    apiKey: "AIzaSyBNOWTdGmsawbWwshBBLmn5iEMy8Hlwer8",
    authDomain: "clarity-dev-1c905.firebaseapp.com",
    projectId: "clarity-dev-1c905",
    storageBucket: "clarity-dev-1c905.appspot.com",
    messagingSenderId: "25056719970",
    appId: "1:25056719970:web:e1798291c599601971cd3b"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();