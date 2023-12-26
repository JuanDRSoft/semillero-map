import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRX0-r3s_xryfx-ro6aZvwLYQlyvSdGFs",
  authDomain: "semillero-react.firebaseapp.com",
  projectId: "semillero-react",
  storageBucket: "semillero-react.appspot.com",
  messagingSenderId: "144495666351",
  appId: "1:144495666351:web:60fc7f376f42d7d7c1a05a",
  measurementId: "G-KD5CWC9PPV",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export { storage, auth, googleProvider, db, firebase as default };
