import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAO46zraHQWxFTdtHcP78OcKheS86_UVqQ",
    authDomain: "pruebadechat-67bcb.firebaseapp.com",
    projectId: "pruebadechat-67bcb",
    storageBucket: "pruebadechat-67bcb.appspot.com",
    messagingSenderId: "461412935220",
    appId: "1:461412935220:web:fc7d2dceb05854f44ecc61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();