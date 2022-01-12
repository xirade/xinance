import { initializeApp } from "firebase/app";
import {
  doc,
  query,
  where,
  addDoc,
  orderBy,
  deleteDoc,
  Timestamp,
  collection,
  onSnapshot,
  getFirestore
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIO7P-tby4QwSzuuP9G7sHQcOa_fO4_FE",
  authDomain: "xinance-analytic.firebaseapp.com",
  projectId: "xinance-analytic",
  storageBucket: "xinance-analytic.appspot.com",
  messagingSenderId: "11838364248",
  appId: "1:11838364248:web:b883c5ffd5f2e937ba882d"
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// timestamp
const timestamp = Timestamp;

export {
  db,
  doc,
  auth,
  query,
  where,
  addDoc,
  signOut,
  orderBy,
  deleteDoc,
  timestamp,
  collection,
  onSnapshot,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
};
