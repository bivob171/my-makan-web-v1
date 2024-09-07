// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  writeBatch,
  where,
  limit,
  getDoc,
  Timestamp,
  startAfter,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import from firebase/storage

const firebaseConfig = {
  apiKey: "AIzaSyAa3H1VKYm435oKsXWQY97dOJNG1mZIZ10",
  authDomain: "mymakan-chat.firebaseapp.com",
  projectId: "mymakan-chat",
  storageBucket: "mymakan-chat.appspot.com",
  messagingSenderId: "23972987185",
  appId: "1:23972987185:web:d9c6faf3323f29571cb010",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export {
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  writeBatch,
  limit,
  getDoc,
  Timestamp,
  startAfter,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  arrayUnion,
  arrayRemove,
};
