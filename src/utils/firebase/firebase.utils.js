import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5wHal0pjOMmMbVnPIXEYa27l5zVjwbUw",
  authDomain: "crwn-clothing-db-fb993.firebaseapp.com",
  projectId: "crwn-clothing-db-fb993",
  storageBucket: "crwn-clothing-db-fb993.appspot.com",
  messagingSenderId: "253764485773",
  appId: "1:253764485773:web:2afca76b4c4fff2d5bd8c4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
};
