import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDzPGnwUdpCaAw2b8h8RO4O-NWbyZMl9oU",
  authDomain: "platescrape-40f7a.firebaseapp.com",
  projectId: "platescrape-40f7a",
  storageBucket: "platescrape-40f7a.appspot.com",
  messagingSenderId: "330197617907",
  appId: "1:330197617907:web:96bbd2c5cc3d3a6a147b86",
  measurementId: "G-FD76JRYPVB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const currentUID = auth.currentUser?.uid
console.log(currentUID)
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
// export const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await setDoc(doc(db, "users", user.uid), {
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
//////////////////////////////////////

