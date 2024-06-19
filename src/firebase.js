// firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAFSkoyJCboo2ZLVg0KwBshYf5wtlS8mrk",
    authDomain: "sector4-youth-organization.firebaseapp.com",
    projectId: "sector4-youth-organization",
    storageBucket: "sector4-youth-organization.appspot.com",
    messagingSenderId: "95530173932",
    appId: "1:95530173932:web:5043f7d548e6a386b32cc9",
    measurementId: "G-PWE4BHR1BY"
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { storage, firestore, auth };