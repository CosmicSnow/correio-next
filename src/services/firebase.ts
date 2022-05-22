import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";

import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyALZcVupymCFB-5UFitI-SIR5IXFQeFq5k",
  authDomain: "playground-1277e.firebaseapp.com",
  databaseURL: "https://playground-1277e-default-rtdb.firebaseio.com",
  projectId: "playground-1277e",
  storageBucket: "playground-1277e.appspot.com",
  messagingSenderId: "858846598855",
  appId: "1:858846598855:web:0d4f2b201cd0d8a1aa90e2",
  measurementId: "G-XKT6XQB9S2",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { firebase, auth };
