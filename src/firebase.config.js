import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADKrArYyscaLV3Sc1khzIdi74YiAiWFlw",
  authDomain: "house-marketplace-app-dc1a2.firebaseapp.com",
  projectId: "house-marketplace-app-dc1a2",
  storageBucket: "house-marketplace-app-dc1a2.appspot.com",
  messagingSenderId: "706490504723",
  appId: "1:706490504723:web:de7e1339602080607c91e6",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
