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

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

auth.useEmulator("http://localhost:9099");
firestore.useEmulator("localhost", 8080);
storage.useEmulator("localhost", 9199);

export { auth, firestore, storage }