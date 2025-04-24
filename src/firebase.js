import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBkf4PJob8fUeGRUVsBSp52kQWDbxRRpPA",
  authDomain: "eco-pulse-2b637.firebaseapp.com",
  projectId: "eco-pulse-2b637",
  storageBucket: "eco-pulse-2b637.appspot.com",  // Firebase Storage URL
  messagingSenderId: "846266556314",
  appId: "1:846266556314:web:1db420043a3dde7d1e6423"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize Firebase Storage

export { auth, db, storage };