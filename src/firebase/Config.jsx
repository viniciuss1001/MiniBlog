import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore"; // importando método necessário

const firebaseConfig = {
    apiKey: "AIzaSyDhiZjH-E6MMmuklBVoMUc-QrMzKCzTXOk",
    authDomain: "miniblog-c7ead.firebaseapp.com",
    projectId: "miniblog-c7ead",
    storageBucket: "miniblog-c7ead.appspot.com",
    messagingSenderId: "222541238724",
    appId: "1:222541238724:web:7b28bb34269c244a2f5491"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore BD
const db = getFirestore(app);
const auth = getAuth()
export { db, auth };



