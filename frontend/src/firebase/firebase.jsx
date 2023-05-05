import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkkPiXvvoLiRdbDRs8mi-vyQRZk4BQnQo",
  authDomain: "miamimarketplace-b1540.firebaseapp.com",
  projectId: "miamimarketplace-b1540",
  storageBucket: "miamimarketplace-b1540.appspot.com",
  messagingSenderId: "990617291556",
  appId: "1:990617291556:web:580adf9682fdacb42bc1b1",
  measurementId: "G-NTKL6Z4LKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};
export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};