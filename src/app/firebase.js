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
  apiKey: "AIzaSyCwgh7xoL0RPq7AUdg84GVwhIPe51KH2J0",
  authDomain: "otakusensei-ff20b.firebaseapp.com",
  projectId: "otakusensei-ff20b",
  storageBucket: "otakusensei-ff20b.appspot.com",
  messagingSenderId: "804042645235",
  appId: "1:804042645235:web:ff93a7f51c8f76f5ea2186",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const GoggleProvider = new GoogleAuthProvider();
