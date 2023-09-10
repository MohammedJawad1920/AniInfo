import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfizqBb8tIKYcaYtb9OKsRuGxj_7BdmPY",
  authDomain: "aniinfo-auth.firebaseapp.com",
  projectId: "aniinfo-auth",
  storageBucket: "aniinfo-auth.appspot.com",
  messagingSenderId: "626832954788",
  appId: "1:626832954788:web:f245921f9b32ce1a24dd31",
  measurementId: "G-QSXDJX88ZV",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
