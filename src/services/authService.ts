import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => {
  const isLocal = window.location.hostname === "localhost";
  return isLocal
    ? signInWithPopup(auth, googleProvider)
    : signInWithRedirect(auth, googleProvider);
};

export const getGoogleRedirectResult = () => getRedirectResult(auth);

export const logoutUser = () => signOut(auth);