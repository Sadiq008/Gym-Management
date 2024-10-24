import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDs9b9UZS0OPnw4e47Jz72hUn57QPW42P8",
  authDomain: "gym-management-2da49.firebaseapp.com",
  projectId: "gym-management-2da49",
  storageBucket: "gym-management-2da49.appspot.com",
  messagingSenderId: "303548763719",
  appId: "1:303548763719:web:8b6e9323441aaee834ab62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };
