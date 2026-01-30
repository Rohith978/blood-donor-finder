import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSrzR3FPfifIHOx-rCPnWBNjOxBJ08lSY",
    authDomain: "blood-donor-finder-eb088.firebaseapp.com",
    projectId: "blood-donor-finder-eb088",
    storageBucket: "blood-donor-finder-eb088.firebasestorage.app",
    messagingSenderId: "39537423600",
    appId: "1:39537423600:web:148d99986c8fcb15807e35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
