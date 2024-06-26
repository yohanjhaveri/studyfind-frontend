import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA2HhlpEPOZzuClQ-svONo3I9quxom1C9w",
  authDomain: "studyfind-development.firebaseapp.com",
  projectId: "studyfind-development",
  storageBucket: "studyfind-development.appspot.com",
  messagingSenderId: "629466210039",
  appId: "1:629466210039:web:a018f233b4e6cd9491bdf2",
});

app.analytics();
app.performance();

export const auth = app.auth();
export const storage = app.storage();
export const functions = app.functions();
export const firestore = app.firestore();

firestore.enablePersistence();
