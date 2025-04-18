// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyA1fTxGZ3_YK_74MhXAMuL7e_ElvkRkFUI",
  authDomain: "ebcfinance-2west.firebaseapp.com",
  projectId: "ebcfinance-2west",
  storageBucket: "ebcfinance-2west.firebasestorage.app",
  messagingSenderId: "411645417603",
  appId: "1:411645417603:web:27329d0c3e5378c322e3b6",
  measurementId: "G-B22XWW33T2"
};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()

