import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp( {
    apiKey: "AIzaSyAWEb6laQmtu-qt8uKwPgVbA6-XC1XZLno",
    authDomain: "clarity-staging-dd864.firebaseapp.com",
    projectId: "clarity-staging-dd864",
    storageBucket: "clarity-staging-dd864.appspot.com",
    messagingSenderId: "39888498966",
    appId: "1:39888498966:web:3e35abc5fdbd6e67a3e037"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();