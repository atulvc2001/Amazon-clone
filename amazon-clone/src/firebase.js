// I believe the firebase had lot of updates recently, so you should update the imports this way and it worked liked a charm. 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnmP8xaaiC72ufiJDdXKQa9F3hcNA9ijo",
    authDomain: "clone-808bd.firebaseapp.com",
    projectId: "clone-808bd",
    storageBucket: "clone-808bd.appspot.com",
    messagingSenderId: "824747094121",
    appId: "1:824747094121:web:97bcbb8efe2770812832f8",
    measurementId: "G-4288G80N0Y"
  }; 


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

  