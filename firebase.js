import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm7lTJ7MMKR1jJVRbkq_tRo7Ms9ZY1r9U",
  authDomain: "growcalth-ios.firebaseapp.com",
  projectId: "growcalth-ios",
  storageBucket: "growcalth-ios.appspot.com",
  messagingSenderId: "626848273230",
  appId: "1:626848273230:web:29f17579aa24447d9dc41f",
  measurementId: "G-8FFPP4MF8V"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };