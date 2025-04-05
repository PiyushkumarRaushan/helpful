import { initializeApp, getApps , getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBc5Uf39gvAhqhiV_0TQ5uKPsRQnMkG3Qg",
    authDomain: "volunteer-1a788.firebaseapp.com",
    projectId: "volunteer-1a788",
    storageBucket: "volunteer-1a788.firebasestorage.app",
    messagingSenderId: "704104278887",
    appId: "1:704104278887:web:274b2ccf5d793f33df9dc2",
    measurementId: "G-9P7K8W3G6M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
