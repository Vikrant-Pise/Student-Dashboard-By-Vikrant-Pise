
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA8xhTEs1K1e4qOWgPT-mijEJmSTv01b2k",
  authDomain: "student-dashboard-b5bb9.firebaseapp.com",
  projectId: "student-dashboard-b5bb9",
  storageBucket: "student-dashboard-b5bb9.firebasestorage.app",
  messagingSenderId: "864617880149",
  appId: "1:864617880149:web:363cf5d2568c7bf222d2dc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName
      };
      callback(user);
    } else {
      callback(null);
    }
  });
};

export { auth };
