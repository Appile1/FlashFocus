import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD17pRjhYy8zfTT9W7FXYMq0UTMORuVnEo",
  authDomain: "focusflash-38363.firebaseapp.com",
  projectId: "focusflash-38363",
  storageBucket: "focusflash-38363.appspot.com",
  messagingSenderId: "429189061472",
  appId: "1:429189061472:web:7e55be850072b8ac1b9c05",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
