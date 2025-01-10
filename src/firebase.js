import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mhm-examen.firebaseapp.com",
  projectId: "mhm-examen",
  storageBucket: "mhm-examen.firebasestorage.app",
  messagingSenderId: "167253869810",
  appId: "1:167253869810:web:aa86afef64abc8f63c3c6b",
  measurementId: "G-DNV3YFFFLL",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
